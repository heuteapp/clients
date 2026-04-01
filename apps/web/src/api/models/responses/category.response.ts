export type CategoryChainResponse = {
    name: string;
    child?: CategoryChainResponse;
}

export type CategoryTreeResponse = {
    name: string;
    children?: CategoryTreeResponse[];
}

export type CategoryHierarchyResponse = {
    roots: CategoryTreeResponse[];
}