import { heuteClient } from "../../heuteClient";

export const meCategories = {
    getCategoryHierarchy : (path: string) => 
        heuteClient.get(`/me/categories/hierarchy/${encodeURIComponent(path)}`).then(res => res.data)
};