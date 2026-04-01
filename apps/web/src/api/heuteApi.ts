import { authEndpoints } from "./endpoints/auth.endpoints";
import { me } from "./endpoints/me";

export const heuteApi = {
    auth: authEndpoints,
    me
};