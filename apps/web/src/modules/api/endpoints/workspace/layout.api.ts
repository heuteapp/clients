import { serverApi } from "@/src/modules/api/server";
import { LayoutResponse } from "@/src/modules/api/models/workspace/layout.response";

export const layoutApi = {
    getLayout: (name: string, version?: number) =>
        serverApi.get<LayoutResponse>(`/workspace/layout/${name}`, { params: { version } }),
};