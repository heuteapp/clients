import { heuteClient } from "@/src/api/heuteClient";
import { CategoryChainResponse, CategoryTreeResponse, CategoryHierarchyResponse } from "@/src/api/models/responses/category.response";

export const categories = {
    getCategoryChain : (path: string) => 
        heuteClient.get<CategoryChainResponse>(`/me/categories/chain/${encodeURIComponent(path)}`).then(res => res.data),

    getCategoryTree : (path: string) => 
        heuteClient.get<CategoryTreeResponse>(`/me/categories/tree/${encodeURIComponent(path)}`).then(res => res.data),

    getCategoryHierarchy : () => 
        heuteClient.get<CategoryHierarchyResponse>(`/me/categories/hierarchy`).then(res => res.data)
};