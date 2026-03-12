import { server } from "@/src/api/server";

export const boardApi = {
    getBoard: (categoryName: string) =>
        server.get(`/workspace/board/${categoryName}`),

    postEvents: (categoryName: string, events: any[]) =>
        server.post(`/workspace/board/${categoryName}/events`, {
        events,
    }),
};