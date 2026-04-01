import { heuteClient } from "@/src/api/heuteClient";

export const categories = {
    getCategoryChain : (path: string) => 
        heuteClient.get(`/me/categories/chain/${encodeURIComponent(path)}`).then(res => res.data),

    getCategoryTree : (path: string) => 
        heuteClient.get(`/me/categories/tree/${encodeURIComponent(path)}`).then(res => res.data),

    getCategoryHierarchy : (path: string) => 
        heuteClient.get(`/me/categories/hierarchy/${encodeURIComponent(path)}`).then(res => res.data)
};