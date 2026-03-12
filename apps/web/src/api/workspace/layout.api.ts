import { serverApi } from "@/src/api/server";

export const layoutApi = {
    getLayout: (name: string, version?: number) =>
        serverApi.get(`/workspace/layout/${name}`, { params: { version } }),
};