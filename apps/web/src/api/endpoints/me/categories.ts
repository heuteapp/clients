import { heuteClient } from "@/src/api/heuteClient";
import { CategoryChainResponse, CategoryTreeResponse, CategoryHierarchyResponse } from "@/src/api/models/responses/category.response";

export const categories = {
    getChain : (path: string) => 
        heuteClient.get<CategoryChainResponse>(`/me/categories/chain/${encodeURIComponent(path)}`).then(res => res.data),

    getTree : (path: string) => 
        heuteClient.get<CategoryTreeResponse>(`/me/categories/tree/${encodeURIComponent(path)}`).then(res => res.data),

    getHierarchy : () => 
        heuteClient.get<CategoryHierarchyResponse>(`/me/categories/hierarchy`).then(res => res.data),

    create: (path: string) =>
        heuteClient.post(`/me/categories/${encodeURIComponent(path)}`).then(res => res.data),
};