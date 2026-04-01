import { heuteClient } from "../../heuteClient";

export const dailyboards = {
    getDailyboard : (path: string) => 
        heuteClient.get(`/me/dailyboards/${encodeURIComponent(path)}`).then(res => res.data)
};