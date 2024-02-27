import ApiHttpClient from "../api.utils";
import { TOAST_STATUS, customToast } from "../toast.utils";

class Api {
  constructor(private apiSdk: ApiHttpClient) {}

  async metadata() {
    const { data, error } = await this.apiSdk.getInstance().get("/metadata");

    if (error || !data.status) return undefined;
    return data.data as QuyxMetadata;
  }

  async getNonce() {
    const resp = await this.apiSdk.getInstance().get("/session/nonce");
    return resp.data as ApiResponse<
      | {
          nonce: string;
          issuedAt: string;
          expirationTime: string;
        }
      | undefined
    >;
  }

  async login({ email, password }: LoginProps) {
    const { data, error } = await this.apiSdk
      .getInstance()
      .post("/dev/login", { email, password });

    if (error || !data.status) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: data.message ?? "Unable to complete request",
      });

      return false;
    }

    const { accessToken, refreshToken } = data.data.tokens;
    localStorage.setItem("quyx_dev_access_token", accessToken);
    localStorage.setItem("quyx_dev_refresh_token", refreshToken);

    return true;
  }

  async register({
    email,
    firstName,
    lastName,
    company,
    password,
  }: Omit<RegisterProps, "role" | "heardUsFrom">) {
    const { data, error } = await this.apiSdk.getInstance().post("/dev", {
      email,
      firstName,
      lastName,
      company,
      password,
    });

    if (error || !data.status) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: data.message ?? "Unable to complete request",
      });

      return false;
    }

    const { accessToken, refreshToken } = data.data.tokens;
    localStorage.setItem("quyx_dev_access_token", accessToken);
    localStorage.setItem("quyx_dev_refresh_token", refreshToken);

    return true;
  }

  async onboard({ role, heardUsFrom }: { role: string; heardUsFrom: string }) {
    const { data, error } = await this.apiSdk.getInstance().put("/dev/onboard", {
      role,
      heardUsFrom,
    });

    if (error || !data.status) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: data.message ?? "Unable to complete request",
      });

      return false;
    }

    return true;
  }

  async verifyOTP({ otp }: { otp: string }) {
    const { data, error } = await this.apiSdk
      .getInstance()
      .put("/dev/verify-otp", { otp });

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

  async resendOTP() {
    const { data, error } = await this.apiSdk.getInstance().put("/dev/resend-otp");
    if (error) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: data.message ?? "Unable to complete request",
      });

      return false;
    }

    return true;
  }

  async sudo({ password }: { password: string }) {
    const { data, error } = await this.apiSdk
      .getInstance()
      .post("/dev/sudo", { password });

    if (error) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: data.message ?? "Unable to complete request",
      });

      return false;
    }

    return true;
  }

  async edit({
    email,
    firstName,
    lastName,
    company,
  }: Partial<Omit<RegisterProps, "password">>) {
    const { data, error } = await this.apiSdk.getInstance().put("/dev/edit", {
      email,
      firstName,
      lastName,
      company: company ?? null,
    });

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

  async changePassword({ oldPassword, newPassword }: ChnagePasswordProps) {
    const { data, error } = await this.apiSdk
      .getInstance()
      .put("/dev/change-password", { oldPassword, newPassword });

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

  async forgotPassword({ email }: { email: string }) {
    const { data, error } = await this.apiSdk
      .getInstance()
      .put(`/dev/forgot-password/${email}`);

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

  async verifyResetPasswordHash({ hash }: { hash: string }) {
    const resp = await this.apiSdk
      .getInstance()
      .get(`/dev/verify/reset-password/${hash}`);

    return resp.data as ApiResponse<QuyxDev | undefined>;
  }

  async resetPassword({ hash, password }: { hash: string; password: string }) {
    const { data, error } = await this.apiSdk
      .getInstance()
      .put(`/dev/reset-password/${hash}`, { password });

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

  async current() {
    const { data, error } = await this.apiSdk.getInstance().get("/dev/current");
    if (error) return undefined;
    return data.data as QuyxDev;
  }

  async getAllAppUsers({
    app,
    page,
    limit,
  }: {
    app: string;
    page: number;
    limit: number;
  }) {
    const { data } = await this.apiSdk
      .getInstance()
      .get(`/sdk/users/dev/${app}?limit=${limit}&page=${page}`);

    return data as ApiPaginationResponse<QuyxSDKUser[] | undefined>;
  }

  async getAllApps({ page, limit }: { page: number; limit: number }) {
    const resp = await this.apiSdk.getInstance().get(`/app?limit=${limit}&page=${page}`);
    return resp.data as ApiPaginationResponse<QuyxApp[] | undefined>;
  }

  async searchApps({
    q,
    page = 1,
    limit = 50,
  }: {
    q: string;
    page: number;
    limit: number;
  }) {
    const resp = await this.apiSdk
      .getInstance()
      .get(`/app/search?q=${q}&limit=${limit}&page=${page}`);

    return resp.data as ApiPaginationResponse<QuyxApp[] | undefined>;
  }

  async getSingleApp({ app }: { app: string }) {
    const { data, error } = await this.apiSdk.getInstance().get(`/app/single/${app}`);
    if (error) return undefined;
    return data.data as QuyxApp;
  }

  async addApp({
    name,
    description,
    whitelistedAddresses,
    blacklistedAddresses,
    allowedBundleIDs,
    allowedDomains,
  }: RegisterAppProps) {
    const { data, error } = await this.apiSdk.getInstance().post(`/app`, {
      name,
      description,
      whitelistedAddresses,
      blacklistedAddresses,
      allowedBundleIDs,
      allowedDomains,
    });

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

  async editApp({
    app,
    name,
    description,
    whitelistedAddresses,
    blacklistedAddresses,
    allowedBundleIDs,
    allowedDomains,
  }: RegisterAppProps & { app: string }) {
    const { data, error } = await this.apiSdk.getInstance().put(`/app/${app}`, {
      name,
      description,
      whitelistedAddresses,
      blacklistedAddresses,
      allowedBundleIDs,
      allowedDomains,
    });

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

  async deleteApp({ app }: { app: string }) {
    const { data, error } = await this.apiSdk.getInstance().delete(`/app/${app}`);
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

  async getDevDashboardMetrics() {
    const resp = await this.apiSdk.getInstance().get("/log/dev/metadata");
    return resp.data as ApiResponse<
      { total_requests: number; total_apps: number } | undefined
    >;
  }

  async getAppMetrics({ app }: { app: string }) {
    const resp = await this.apiSdk.getInstance().get(`/log/app/metrics/${app}`);
    return resp.data as ApiResponse<AppMetrics | undefined>;
  }

  async getLogs({ limit, page }: { limit: number; page: number }) {
    const resp = await this.apiSdk.getInstance().get(`/log?limit=${limit}&page=${page}`);
    return resp.data as ApiPaginationResponse<QuyxLog[]>;
  }

  async getAppLogs({
    app,
    status,
    limit,
    page,
  }: {
    app: string;
    status?: "failed" | "successful";
    limit: number;
    page: number;
  }) {
    const endpoint = `/log/app/status/${
      status ? status : "all"
    }/${app}?limit=${limit}&page=${page}`;

    const resp = await this.apiSdk.getInstance().get(endpoint);
    return resp.data as ApiPaginationResponse<QuyxLog[]>;
  }

  async getAppHealth({ app, from, to }: { app: string; from: Date; to: Date }) {
    const resp = await this.apiSdk
      .getInstance()
      .get(`/app/health/${app}?from=${from}&to=${to}`);

    return resp.data as ApiResponse<{
      success_24: number;
      failed_24: number;
    }>;
  }

  async getRequestHealth() {
    const resp = await this.apiSdk.getInstance().get(`/log/dev/health`);

    return resp.data as ApiResponse<{
      success_24: number;
      failed_24: number;
    }>;
  }

  async getRequestGrowth() {
    const resp = await this.apiSdk.getInstance().get(`/log/dev/growth`);
    return resp.data as ApiResponse<RequestGrowthResponse>;
  }

  async getRequestHealthCustom({ from, to }: { from: Date; to: Date }) {
    const resp = await this.apiSdk
      .getInstance()
      .get(`/log/dev/health/custom?from=${from.toISOString()}&to=${to.toISOString()}`);

    return resp.data as ApiResponse<{
      successful_requests: number;
      failed_requests: number;
    }>;
  }

  async getIntoAiWaitlist() {
    const { error, data } = await this.apiSdk.getInstance().post("/ai-waitlist");
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

  async isUserInAiWaitlist() {
    const { error, data } = await this.apiSdk.getInstance().get("/ai-waitlist");
    if (error) return false;
    return data.data as boolean;
  }

  async removeFromAiWaitlist() {
    const { error, data } = await this.apiSdk.getInstance().delete("/ai-waitlist");
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

  async logout() {
    const { data, error } = await this.apiSdk.getInstance().delete("/session");
    if (error) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: data.message ?? "Unable to complete request",
      });

      return false;
    }

    localStorage.removeItem("quyx_dev_access_token");
    localStorage.removeItem("quyx_dev_refresh_token");
    return true;
  }
}

export const api = new Api(new ApiHttpClient());
