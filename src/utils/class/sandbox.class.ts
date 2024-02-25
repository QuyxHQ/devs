import { SiweMessage } from "siwe";
import ApiHttpClient from "../api.utils";
import settings from "../settings";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
import { TOAST_STATUS, customToast } from "../toast.utils";

export default class Sandbox {
  private apiSdk: ApiHttpClient;

  constructor(clientId: string, tokens?: { accessToken: string; refreshToken: string }) {
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

  async login({
    address,
    chainId,
    signer,
  }: {
    address: string;
    chainId: number;
    signer: ethers.Signer;
  }) {
    try {
      const message = new SiweMessage({
        domain: document.location.host,
        address,
        chainId,
        uri: document.location.origin,
        version: "1",
        statement: `Welcome to Quyx Developers Sandbox!
        Sign this message to verify ownership of wallet in order to continue`,
        nonce: uuidv4(),
      });

      const signature = await signer.signMessage(message.prepareMessage());
      const resp = await this.apiSdk
        .getInstance()
        .post("/login", { message, address, signature });

      return resp;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async currentSdkUser() {
    const { data, error } = await this.apiSdk.getInstance().get("/current");
    if (error) return undefined;
    return data.data as QuyxSDKUser;
  }

  async getUserCards({ limit, page }: { limit: number; page: number }) {
    const { data } = await this.apiSdk
      .getInstance()
      .get(`/cards?limit=${limit}&page=${page}`);

    return data as ApiPaginationResponse<QuyxCard | undefined>;
  }

  async changeImportedCard({ card }: { card: string }) {
    const { data, error } = await this.apiSdk.getInstance().put(`/change/${card}`);

    if (error) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: data.message ?? "Unable to complete request",
      });

      return false;
    }

    customToast({
      type: TOAST_STATUS.SUCCESS,
      message: data.message,
    });

    return true;
  }

  async disconnect() {
    const { data, error } = await this.apiSdk.getInstance().delete("/disconnect");
    if (error) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: data.message ?? "Unable to complete request",
      });

      return false;
    }

    customToast({
      type: TOAST_STATUS.SUCCESS,
      message: data.message,
    });

    return true;
  }

  async allUsers(options?: { limit: number; page: number }) {
    let endpoint = `/users/all`;
    if (options) {
      endpoint = `/users/all?page=${options.page}&limit=${options.limit}`;
    }

    const { data, error } = await this.apiSdk.getInstance().get(endpoint);
    if (error) return undefined;

    return data as ApiPaginationResponse<QuyxSDKUser>;
  }

  async getSingleUser({ address }: { address: string }) {
    const { data, error } = await this.apiSdk
      .getInstance()
      .get(`/user/single/${address}`);
    if (error) return undefined;
    return data.data as QuyxSDKUser;
  }
}
