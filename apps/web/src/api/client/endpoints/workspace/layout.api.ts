import { serverApi } from "@/src/api/client/server";
import { LayoutResponse } from "../../../models/workspace/layout.response";

export const layoutApi = {
    getLayout: (name: string, version?: number) =>
        serverApi.get<LayoutResponse>(`/workspace/layout/${name}`, { params: { version } }),
};