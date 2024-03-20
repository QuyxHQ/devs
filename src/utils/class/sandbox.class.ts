import ApiHttpClient from "../api.utils";
import settings from "../settings";
import { TOAST_STATUS, customToast } from "../toast.utils";
import { api } from "./api.class";
import axios, { AxiosError } from "axios";
import { QuyxSIWS, QuyxSIWSProps } from "@quyx/siws";
import bs58 from "bs58";

export default class Sandbox {
  private apiSdk: ApiHttpClient;
  private accessToken?: string;
  private refreshToken?: string;

  constructor(clientId: string, tokens?: { accessToken: string; refreshToken: string }) {
    this.accessToken = tokens?.accessToken;
    this.refreshToken = tokens?.refreshToken;
    this.apiSdk = new ApiHttpClient({
      baseURL: `${settings.ENDPOINT_URL}/sdk`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Quyx-Client-Id": clientId,
        ...(tokens
          ? {
              Authorization: `Bearer ${tokens.accessToken}`,
              "X-Refresh": tokens.refreshToken,
            }
          : {}),
      },
    });
  }

  async init({ address }: { address: string }) {
    const { data } = await api.getNonce(address);
    if (!data) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: "unable to retrieve nonce",
      });

      return undefined;
    }

    return { ...data, address, chainId: "devnet" } as QuyxSIWSProps;
  }

  async login({ message, signature }: { message: QuyxSIWSProps; signature: Uint8Array }) {
    const msg = new QuyxSIWS(message);
    const isvalid = msg.validate(signature);
    console.log("is valid: ", isvalid);

    const resp = await this.apiSdk.getInstance().post("/login", {
      message: { ...message, statement: msg.statement, domain: msg.domain },
      signature: bs58.encode(signature),
    });

    return resp;
  }

  async currentSdkUser() {
    const resp = await this.apiSdk.getInstance().get("/whoami");
    return resp;
  }

  async getUserCards({ limit, page }: { limit: number; page: number }) {
    const { data } = await this.apiSdk
      .getInstance()
      .get(`/cards?limit=${limit}&page=${page}`);

    return data as ApiPaginationResponse<QuyxCard[] | undefined>;
  }

  async changeImportedCard({ card }: { card: string }) {
    const resp = await this.apiSdk.getInstance().put(`/change/${card}`);

    if (resp.error) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: resp.data.message ?? "Unable to complete request",
      });
    } else {
      customToast({
        type: TOAST_STATUS.SUCCESS,
        message: resp.data.message,
      });
    }

    return resp;
  }

  async disconnect() {
    const resp = await this.apiSdk.getInstance().delete("/disconnect");
    if (resp.error) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: resp.data.message ?? "Unable to complete request",
      });
    } else {
      customToast({
        type: TOAST_STATUS.SUCCESS,
        message: resp.data.message,
      });
    }

    return resp;
  }

  async allUsers(options?: { limit: number; page: number }) {
    let endpoint = `/users/all`;
    if (options) {
      endpoint = `/users/all?page=${options.page}&limit=${options.limit}`;
    }

    const { data, error } = await this.apiSdk.getInstance().get(endpoint);
    if (error) return undefined;

    return data as ApiPaginationResponse<QuyxSDKUser[]>;
  }

  async getSingleUser({ address }: { address: string }) {
    const resp = await this.apiSdk.getInstance().get(`/user/single/${address}`);
    return resp;
  }

  async logout() {
    try {
      const { data } = await axios.delete(`${settings.ENDPOINT_URL}/session`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
          "X-Refresh": this.refreshToken,
        },
      });

      return { data, error: false };
    } catch (e: any) {
      if (e && e instanceof AxiosError) {
        return {
          error: true,
          data: e.response?.data,
        };
      }

      return {
        error: true,
        data: undefined,
      };
    }
  }
}
