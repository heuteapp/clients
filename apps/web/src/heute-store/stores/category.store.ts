import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CategoryHierarchy, CategoryTree } from "@/src/modules/category/types/category.types";
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
                    const id = `cat_${idCounter++}`;
                    
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