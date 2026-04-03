import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CategoryChain, CategoryHierarchy, CategoryTree } from "@/src/modules/category/types/category.types";
import { CategoryState, CategoryOwnerData, StoredCategory, CategoryRequest } from "@/src/heute-store/types/category.types";

export const useCategoryStore = create<CategoryState>()(
    devtools(
        immer((set, get) => ({
            me: null,
            users: {},
            userOrder: [],

            loadMe: (hierarchy: CategoryHierarchy) => {
                set({ me: flattenToOwnerData('me', hierarchy) });
            },

            loadUser: (user: string, hierarchy: CategoryHierarchy) => {
                set((state) => {
                    state.userOrder = state.userOrder.filter(u => u !== user);
                    state.userOrder.push(user);
                    
                    if (state.userOrder.length > 20) {
                        const oldestUser = state.userOrder.shift();
                        if (oldestUser) {
                            delete state.users[oldestUser];
                        }
                    }
                    
                    state.users[user] = flattenToOwnerData(user, hierarchy);
                });
            },

            getMeChain: (path: string) => {
                const me = get().me;
                if (!me) return null;
                return getChainFromData(me, path);
            },

            getMeTree: (path: string) => {
                const me = get().me;
                if (!me) return null;
                return getTreeFromData(me, path);
            },

            getMeHierarchy: () => {
                const me = get().me;
                if (!me) return null;
                return getHierarchyFromData(me);
            },
            
            getMeRoots: () => {
                const me = get().me;
                if (!me) return [];
                return me.rootIds.map(id => me.byId[id]);
            },

            getMeChildren: (parentId: string | null) => {
                const me = get().me;
                if (!me) return [];
                
                if (parentId === null) {
                    return me.rootIds.map(id => me.byId[id]);
                }
                
                const childIds = me.byParentId[parentId] || [];
                return childIds.map(id => me.byId[id]);
            },

            getUserChain: (user: string, path: string) => {
                const userData = get().users[user];
                if (!userData) return null;
                return getChainFromData(userData, path);
            },

            getUserTree: (user: string, path: string) => {
                const userData = get().users[user];
                if (!userData) return null;
                return getTreeFromData(userData, path);
            },

            getUserHierarchy: (user: string) => {
                const userData = get().users[user];
                if (!userData) return null;
                return getHierarchyFromData(userData);
            },

            getUserRoots: (user: string) => {
                const userData = get().users[user];
                if (!userData) return [];
                return userData.rootIds.map(id => userData.byId[id]);
            },

            getUserChildren: (user: string, parentId: string | null) => {
                const userData = get().users[user];
                if (!userData) return [];
                
                if (parentId === null) {
                    return userData.rootIds.map(id => userData.byId[id]);
                }
                
                const childIds = userData.byParentId[parentId] || [];
                return childIds.map(id => userData.byId[id]);
            },

            addCategory: (request: CategoryRequest) => {
                set((state) => {
                    if (!state.me) return;

                    const processRequest = (
                        req: CategoryRequest,
                        parentId: string | null,
                        currentPath: string = ""
                    ): string | null => {
                        if (typeof req.src === 'string') {
                            const targetPath = currentPath 
                                ? `${currentPath}/${req.src}` 
                                : req.src;
                            const targetId = `me@${targetPath}`;
                            
                            if (!state.me!.byId[targetId]) {
                                console.error(`Category not found: ${targetPath}`);
                                return null;
                            }
                            
                            if (req.child) {
                                return processRequest(req.child, targetId, targetPath);
                            }
                            
                            return targetId;
                        } 
                        else {
                            const newCategoryName = req.src.name;
                            const newPath = currentPath 
                                ? `${currentPath}/${newCategoryName}` 
                                : newCategoryName;
                            const newId = `me@${newPath}`;
                            
                            if (state.me!.byId[newId]) {
                                console.error(`Category already exists: ${newPath}`);
                                return null;
                            }
                            
                            state.me!.byId[newId] = {
                                id: newId,
                                name: newCategoryName,
                                parentId: parentId,
                            };
                            
                            if (parentId === null) {
                                state.me!.rootIds.push(newId);
                                state.me!.rootIds = sortChildren(state.me!, null);
                            } else {
                                if (!state.me!.byParentId[parentId]) {
                                    state.me!.byParentId[parentId] = [];
                                }
                                state.me!.byParentId[parentId].push(newId);
                                state.me!.byParentId[parentId] = sortChildren(state.me!, parentId);
                            }
                            
                            if (req.child) {
                                return processRequest(req.child, newId, newPath);
                            }
                            
                            return newId;
                        }
                    };
                    
                    processRequest(request, null);
                });
            },

            hasUser: (user: string) => {
                return !!get().users[user];
            },

            clearMe: () => {
                set({ me: null });
            },

            clearUser: (user: string) => {
                set((state) => {
                    delete state.users[user];
                    state.userOrder = state.userOrder.filter(u => u !== user);
                });
            },
        })),
        { 
            name: "CategoryStore"
        }
    )
);

const flattenToOwnerData = (owner: string, hierarchy: CategoryHierarchy): CategoryOwnerData => {
    const byId: Record<string, StoredCategory> = {};
    const byParentId: Record<string, string[]> = {};
    const rootIds: string[] = [];
    
    const flatten = (node: CategoryTree, parentId: string | null, path: string = "") => {
        const currentPath = path ? `${path}/${node.name}` : node.name;
        const id = `${owner}@${currentPath}`;
        
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
        
        node.children?.forEach(child => flatten(child, id, currentPath));
    };
    
    hierarchy.roots.forEach(root => flatten(root, null));
    
    return { byId, byParentId, rootIds };
};

const getChainFromData = (data: CategoryOwnerData, path: string): CategoryChain | null => {
    const names = path.split('/');
    
    const buildChain = (currentId: string | null, index: number): CategoryChain | null => {
        if (index >= names.length) return null;
        
        const candidates = currentId === null 
            ? data.rootIds 
            : (data.byParentId[currentId] || []);
        
        const matchedId = candidates.find(id => 
            data.byId[id].name === names[index]
        );
        
        if (!matchedId) return null;
        
        const category = data.byId[matchedId];
        
        if (index === names.length - 1) {
            return { name: category.name };
        }
        
        const child = buildChain(matchedId, index + 1);
        if (!child) return null;
        
        return {
            name: category.name,
            child
        };
    };
    
    return buildChain(null, 0);
};

const getTreeFromData = (data: CategoryOwnerData, path: string): CategoryTree | null => {
    const names = path.split('/');
    
    const findNode = (currentId: string | null, index: number): CategoryTree | null => {
        if (index >= names.length) return null;
        
        const candidates = currentId === null 
            ? data.rootIds 
            : (data.byParentId[currentId] || []);
        
        const matchedId = candidates.find(id => 
            data.byId[id].name === names[index]
        );
        
        if (!matchedId) return null;
        
        const category = data.byId[matchedId];
        
        if (index === names.length - 1) {
            const buildFullTree = (id: string): CategoryTree => {
                return {
                    name: data.byId[id].name,
                    children: (data.byParentId[id] || []).map(buildFullTree),
                };
            };
            return buildFullTree(matchedId);
        }
        
        const child = findNode(matchedId, index + 1);
        if (!child) return null;
        
        return {
            name: category.name,
            children: [child],
        };
    };
    
    return findNode(null, 0);
};

const getHierarchyFromData = (data: CategoryOwnerData): CategoryHierarchy => {
    const { byId, byParentId, rootIds } = data;
    
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
};

const sortChildren = (data: CategoryOwnerData, parentId: string | null): string[] => {
    const childIds = parentId === null 
        ? data.rootIds 
        : (data.byParentId[parentId] || []);
    
    return [...childIds].sort((a, b) => {
        const categoryA = data.byId[a];
        const categoryB = data.byId[b];
        
        const aHasChildren = (data.byParentId[a]?.length || 0) > 0;
        const bHasChildren = (data.byParentId[b]?.length || 0) > 0;
        
        if (aHasChildren !== bHasChildren) {
            return aHasChildren ? 1 : -1;
        }
        
        return categoryA.name.localeCompare(categoryB.name);
    });
};