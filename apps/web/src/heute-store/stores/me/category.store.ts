import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MeCategoryState } from "@/src/heute-store/types/me/category.types";
import { CategoryHierarchy, CategoryTree } from "@/src/modules/category/types/category.types";

export const useMeCategoryStore = create<MeCategoryState>()(
    immer((set) => ({
        byId: new Map(),
        byParentId: new Map(),
        rootIds: [],

        loadFromHierarchy: (hierarchy: CategoryHierarchy) => {
            set((state) => {
                let idCounter = state.byId.size + 1;
                
                const flatten = (node: CategoryTree, parentId: string | null) => {
                    const id = `cat_${idCounter++}`;
                    
                    state.byId.set(id, {
                        id,
                        name: node.name,
                        parentId
                    });
                    
                    if (parentId === null) {
                        if (!state.rootIds.includes(id)) {
                            state.rootIds.push(id);
                        }
                    } else {
                        const existing = state.byParentId.get(parentId) || [];
                        if (!existing.includes(id)) {
                            state.byParentId.set(parentId, [...existing, id]);
                        }
                    }
                    
                    if (node.children) {
                        node.children.forEach(child => flatten(child, id));
                    }
                };
                
                hierarchy.roots.forEach(root => flatten(root, null));
            });
        }
    }))
);