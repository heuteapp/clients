import { heuteClient } from "../../heuteClient";

export const categories = {
    getCategoryHierarchy : (path: string) => 
        heuteClient.get(`/me/categories/hierarchy/${encodeURIComponent(path)}`).then(res => res.data)
};