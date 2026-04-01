import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CategoryChain, CategoryHierarchy, CategoryTree } from "@/src/modules/category/types/category.types";
import { CategoryState, StoredCategory } from "@/src/heute-store/types/category.types";

export const useCategoryStore = create<CategoryState>()(
    immer((set, get) => ({
        owners: {},

        loadFromHierarchy: (owner: string, hierarchy: CategoryHierarchy) => {
            set((state) => {
                const byId: Record<string, StoredCategory> = {};
                const byParentId: Record<string, string[]> = {};
                const rootIds: string[] = [];
                
                let idCounter = 0;
                
                const flatten = (node: CategoryTree, parentId: string | null) => {
                    const id = `${owner}_${idCounter++}`;
                    
                    byId[id] = {
                        id,
                        name: node.name,
                        parentId,
                    };
                    
                    if (parentId === null) {
                        rootIds.push(id);
                    } else {
                        if (!byParentId[parentId]) byParentId[parentId] = [];
                        byParentId[parentId].push(id);
                    }
                    
                    node.children?.forEach(child => flatten(child, id));
                };
                
                hierarchy.roots.forEach(root => flatten(root, null));
                
                state.owners[owner] = { byId, byParentId, rootIds };
            });
        },

        getChain: (owner: string, path: string) => {
            const ownerData = get().owners[owner];
            if (!ownerData) return null;

            const names = path.split('/');
            
            const buildChain = (currentId: string | null, index: number): CategoryChain | null => {
                if (index >= names.length) return null;
                
                const candidates = currentId === null 
                    ? ownerData.rootIds 
                    : (ownerData.byParentId[currentId] || []);
                
                const matchedId = candidates.find(id => 
                    ownerData.byId[id].name === names[index]
                );
                
                if (!matchedId) return null;
                
                const category = ownerData.byId[matchedId];
                const child = buildChain(matchedId, index + 1);
                
                return {
                    name: category.name,
                    ...(child && { child })
                };
            };
            
            return buildChain(null, 0);
        },

        getTree: (owner: string, path: string) => {
            const ownerData = get().owners[owner];
            if (!ownerData) return null;

            const names = path.split('/');
            
            const findNode = (currentId: string | null, index: number): CategoryTree | null => {
                if (index >= names.length) return null;
                
                const candidates = currentId === null 
                    ? ownerData.rootIds 
                    : (ownerData.byParentId[currentId] || []);
                
                const matchedId = candidates.find(id => 
                    ownerData.byId[id].name === names[index]
                );
                
                if (!matchedId) return null;
                
                const category = ownerData.byId[matchedId];
                
                // Eğer sonuncuysa, tüm alt dallarıyla döndür
                if (index === names.length - 1) {
                    const buildFullTree = (id: string): CategoryTree => {
                        return {
                            name: ownerData.byId[id].name,
                            children: (ownerData.byParentId[id] || []).map(buildFullTree),
                        };
                    };
                    return buildFullTree(matchedId);
                }
                
                // Değilse, devam et
                const child = findNode(matchedId, index + 1);
                if (!child) return null;
                
                return {
                    name: category.name,
                    children: [child],
                };
            };
            
            return findNode(null, 0);
        },

        getHierarchy: (owner: string) => {
            const ownerData = get().owners[owner];
            if (!ownerData) return null;

            const { byId, byParentId, rootIds } = ownerData;

            const buildTree = (id: string): CategoryTree => {
                const category = byId[id];
                return {
                    name: category.name,
                    children: (byParentId[id] || []).map(buildTree),
                };
            };

            return {
                roots: rootIds.map(buildTree),
            };
        },

        clearOwner: (owner: string) => {
            set((state) => {
                delete state.owners[owner];
            });
        },

        hasOwner: (owner: string) => {
            return !!get().owners[owner];
        }
    }))
);