import { serverApi } from "@/src/api/client/server";

export const boardApi = {
    getBoard: (categoryName: string) =>
        serverApi.get(`/workspace/board/${categoryName}`),

    postEvents: (categoryName: string, events: any[]) =>
        serverApi.post(`/workspace/board/${categoryName}/events`, {
        events,
    }),
};