import ApiHttpClient from '../api.utils';
import toast from '../toast.utils';

class Api {
    constructor(private apiSdk: ApiHttpClient) {}

    async current() {
        const { data, error } = await this.apiSdk.getInstance().get('/dev/whoami');
        if (error) return undefined;

        return data.data as Dev;
    }

    async getSpaces({ page, limit }: { page: number; limit: number }) {
        const resp = await this.apiSdk.getInstance().get(`/space?limit=${limit}&page=${page}`);
        return (resp.data as Space[]) ?? [];
    }

    async searchSpace({ q, page = 1, limit = 50 }: { q: string; page: number; limit: number }) {
        const { data } = await this.apiSdk
            .getInstance()
            .get(`/space/search?q=${q}&limit=${limit}&page=${page}`);

        return {
            total: (data.data.total as number) || 0,
            data: (data.data.data as Space[]) || [],
        };
    }

    async getSingleSpace({ did }: { did: string }) {
        const { data, error } = await this.apiSdk.getInstance().get(`/space/${did}`);
        if (error) return undefined;
        return data.data as Space;
    }

    async getSpaceKeys({ did }: { did: string }) {
        const { data, error } = await this.apiSdk.getInstance().get(`/space/keys/${did}`);
        if (error) return undefined;
        return data.data as { keys: { keys: { pk: string; sk: string } } };
    }

    async createSpace({ name, url }: CreateSpaceProps) {
        const { data, error } = await this.apiSdk.getInstance().post(`/space`, {
            name,
            url,
        });

        if (error) {
            toast({
                type: 'error',
                message: data.error ?? 'Unable to complete request',
            });

            return false;
        }

        toast({
            type: 'success',
            message: 'Space registered',
        });

        return true;
    }

    async updateSpace({ did, url, name }: CreateSpaceProps & { did: string }) {
        const { data, error } = await this.apiSdk.getInstance().put(`/space/${did}`, {
            url,
            name,
        });

        if (error) {
            toast({
                type: 'error',
                message: data.error ?? 'Unable to complete request',
            });

            return false;
        }

        toast({
            type: 'success',
            message: 'Space updated!',
        });

        return true;
    }

    async deleteSpace({ did }: { did: string }) {
        const { data, error } = await this.apiSdk.getInstance().delete(`/space/${did}`);
        if (error) {
            toast({
                type: 'error',
                message: data.error ?? 'Unable to complete request',
            });

            return false;
        }

        toast({
            type: 'success',
            message: 'Space deleted successfully!',
        });

        return true;
    }

    async getDevDashboardMetrics() {
        const resp = await this.apiSdk.getInstance().get('/log/dev/metrics');
        return resp.data.data as DashboardMetrics | undefined;
    }

    async getSpaceMetrics({ space }: { space: string }) {
        const resp = await this.apiSdk.getInstance().get(`/log/space/metrics/${space}`);
        return resp.data.data as SpaceMetrics;
    }

    async getLogs({ limit, page }: { limit: number; page: number }) {
        const resp = await this.apiSdk.getInstance().get(`/log/dev?limit=${limit}&page=${page}`);
        return resp.data.data as { total: number; response: Log[] };
    }

    async getSpaceLogs({ space, limit, page }: { space: string; limit: number; page: number }) {
        const resp = await this.apiSdk
            .getInstance()
            .get(`/log/space/${space}?page=${page}&limit=${limit}`);

        return resp.data.data as { total: number; response: Log[] };
    }

    async logout(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!localStorage.getItem('token')) return reject(false);

            localStorage.removeItem('token');
            return resolve(true);
        });
    }
}

export const api = new Api(new ApiHttpClient());
