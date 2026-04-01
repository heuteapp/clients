import { AuthProfile } from "@/src/modules/auth/types/auth.types";
import { heuteClient } from "../../heuteClient";
import { categories } from "./categories";
import { dailyboards } from "./dailyboards";

export const me = {
    check: () : Promise<AuthProfile | null> =>
        heuteClient.get("/me").then(res => res.data),
    
    refresh: (): Promise<{ accessToken: string }> =>
        heuteClient.post("/me/refresh").then(res => res.data),
    
    categories,
    dailyboards
};