import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CategoryChain, CategoryHierarchy, CategoryTree } from "@/src/modules/d-category/types/category.types";
import { CategoryState, StoredCategory } from "@/src/heute-store/types/category.types";

export const useCategoryStore = create<CategoryState>()(
    devtools(
        immer((set, get) => ({
            byId: {},
            byParentId: {},
            rootIds: [],
            userOrder: [],

            loadMe: (hierarchy: CategoryHierarchy) => {
                set((state) => {
                    // Önce eski me verilerini temizle
                    const meIds = Object.keys(state.byId).filter(id => id.startsWith('me@'));
                    meIds.forEach(id => {
                        delete state.byId[id];
                    });
                    
                    Object.keys(state.byParentId).forEach(parentId => {
                        if (parentId.startsWith('me@')) {
                            delete state.byParentId[parentId];
                        } else {
                            state.byParentId[parentId] = state.byParentId[parentId].filter(childId => 
                                !childId.startsWith('me@')
                            );
                        }
                    });
                    
                    state.rootIds = state.rootIds.filter(id => !id.startsWith('me@'));
                    
                    // Yeni me verilerini ekle
                    flattenToStore(state, 'me', hierarchy);
                    
                    if (!state.userOrder.includes('me')) {
                        state.userOrder.push('me');
                    }
                });
            },

            loadUser: (user: string, hierarchy: CategoryHierarchy) => {
                set((state) => {
                    // Önce eski user verilerini temizle
                    const userIds = Object.keys(state.byId).filter(id => id.startsWith(`${user}@`));
                    userIds.forEach(id => {
                        delete state.byId[id];
                    });
                    
                    Object.keys(state.byParentId).forEach(parentId => {
                        if (parentId.startsWith(`${user}@`)) {
                            delete state.byParentId[parentId];
                        } else {
                            state.byParentId[parentId] = state.byParentId[parentId].filter(childId => 
                                !childId.startsWith(`${user}@`)
                            );
                        }
                    });
                    
                    state.rootIds = state.rootIds.filter(id => !id.startsWith(`${user}@`));
                    
                    // Yeni user verilerini ekle
                    flattenToStore(state, user, hierarchy);
                    
                    // UserOrder'ı güncelle
                    state.userOrder = state.userOrder.filter(u => u !== user);
                    state.userOrder.push(user);
                    
                    // LRU cache: 20 user limit
                    while (state.userOrder.length > 20) {
                        const oldestUser = state.userOrder.shift();
                        if (oldestUser) {
                            const oldUserIds = Object.keys(state.byId).filter(id => id.startsWith(`${oldestUser}@`));
                            oldUserIds.forEach(id => {
                                delete state.byId[id];
                            });
                            
                            Object.keys(state.byParentId).forEach(parentId => {
                                if (parentId.startsWith(`${oldestUser}@`)) {
                                    delete state.byParentId[parentId];
                                } else {
                                    state.byParentId[parentId] = state.byParentId[parentId].filter(childId => 
                                        !childId.startsWith(`${oldestUser}@`)
                                    );
                                }
                            });
                            
                            state.rootIds = state.rootIds.filter(id => !id.startsWith(`${oldestUser}@`));
                        }
                    }
                });
            },

            getMeChain: (path: string) => {
                const state = get();
                return getChainFromStore(state, 'me', path);
            },

            getMeTree: (path: string) => {
                const state = get();
                return getTreeFromStore(state, 'me', path);
            },

            getMeHierarchy: () => {
                const state = get();
                return getHierarchyFromStore(state, 'me');
            },
            
            getMeRoots: () => {
                const state = get();
                return state.rootIds
                    .filter(id => id.startsWith('me@'))
                    .map(id => state.byId[id]);
            },

            getMeChildren: (parentId: string | null) => {
                const state = get();
                
                if (parentId === null) {
                    return state.rootIds
                        .filter(id => id.startsWith('me@'))
                        .map(id => state.byId[id]);
                }
                
                if (!parentId.startsWith('me@')) return [];
                
                const childIds = state.byParentId[parentId] || [];
                return childIds.map(id => state.byId[id]);
            },

            getUserChain: (user: string, path: string) => {
                const state = get();
                return getChainFromStore(state, user, path);
            },

            getUserTree: (user: string, path: string) => {
                const state = get();
                return getTreeFromStore(state, user, path);
            },

            getUserHierarchy: (user: string) => {
                const state = get();
                return getHierarchyFromStore(state, user);
            },

            getUserRoots: (user: string) => {
                const state = get();
                const userRootIds = state.rootIds.filter(id => id.startsWith(`${user}@`));
                if (userRootIds.length === 0) return null;
                return userRootIds.map(id => state.byId[id]);
            },

            getUserChildren: (user: string, parentId: string | null) => {
                const state = get();
                
                if (parentId === null) {
                    const userRootIds = state.rootIds.filter(id => id.startsWith(`${user}@`));
                    if (userRootIds.length === 0) return null;
                    return userRootIds.map(id => state.byId[id]);
                }
                
                if (!parentId.startsWith(`${user}@`)) return null;
                
                const childIds = state.byParentId[parentId] || [];
                if (childIds.length === 0) return null;
                return childIds.map(id => state.byId[id]);
            },

            initializeCategory: (path: string) => {
                const names = path.split('/').filter(Boolean);
                if (names.length === 0) return;

                set((state) => {
                    let currentParentId: string | null = null;
                    let currentPath = "";

                    for (const name of names) {
                        currentPath = currentPath ? `${currentPath}/${name}` : name;
                        const id = `me@${currentPath}`;

                        if (state.byId[id]) {
                            currentParentId = id;
                            continue;
                        }

                        state.byId[id] = {
                            id,
                            name,
                            parentId: currentParentId,
                        };

                        if (currentParentId === null) {
                            state.rootIds.push(id);
                            state.rootIds = sortChildrenFromStore(state, null);
                        } else {
                            if (!state.byParentId[currentParentId]) {
                                state.byParentId[currentParentId] = [];
                            }
                            state.byParentId[currentParentId].push(id);
                            state.byParentId[currentParentId] = sortChildrenFromStore(state, currentParentId);
                        }

                        currentParentId = id;
                    }
                });
            },

            sortMe: () => {
                set((state) => {
                    sortRecursiveFromStore(state, null, 'me');
                });
            },

            hasUser: (user: string) => {
                return get().userOrder.includes(user);
            },

            clearMe: () => {
                set((state) => {
                    const meIds = Object.keys(state.byId).filter(id => id.startsWith('me@'));
                    meIds.forEach(id => {
                        delete state.byId[id];
                    });
                    
                    Object.keys(state.byParentId).forEach(parentId => {
                        if (parentId.startsWith('me@')) {
                            delete state.byParentId[parentId];
                        } else {
                            state.byParentId[parentId] = state.byParentId[parentId].filter(childId => 
                                !childId.startsWith('me@')
                            );
                        }
                    });
                    
                    state.rootIds = state.rootIds.filter(id => !id.startsWith('me@'));
                    state.userOrder = state.userOrder.filter(u => u !== 'me');
                });
            },

            clearUser: (user: string) => {
                set((state) => {
                    const userIds = Object.keys(state.byId).filter(id => id.startsWith(`${user}@`));
                    userIds.forEach(id => {
                        delete state.byId[id];
                    });
                    
                    Object.keys(state.byParentId).forEach(parentId => {
                        if (parentId.startsWith(`${user}@`)) {
                            delete state.byParentId[parentId];
                        } else {
                            state.byParentId[parentId] = state.byParentId[parentId].filter(childId => 
                                !childId.startsWith(`${user}@`)
                            );
                        }
                    });
                    
                    state.rootIds = state.rootIds.filter(id => !id.startsWith(`${user}@`));
                    state.userOrder = state.userOrder.filter(u => u !== user);
                });
            },
        })),
        { 
            name: "CategoryStore"
        }
    )
);

const flattenToStore = (
    state: CategoryState, 
    owner: string, 
    hierarchy: CategoryHierarchy
) => {
    const flatten = (node: CategoryTree, parentId: string | null, path: string = "") => {
        const currentPath = path ? `${path}/${node.name}` : node.name;
        const id = `${owner}@${currentPath}`;
        
        state.byId[id] = {
            id,
            name: node.name,
            parentId,
        };
        
        if (parentId === null) {
            state.rootIds.push(id);
        } else {
            if (!state.byParentId[parentId]) {
                state.byParentId[parentId] = [];
            }
            state.byParentId[parentId].push(id);
        }
        
        node.children?.forEach(child => flatten(child, id, currentPath));
    };
    
    hierarchy.roots.forEach(root => flatten(root, null));
};

const getChainFromStore = (
    state: CategoryState,
    owner: string,
    path: string
): CategoryChain | null => {
    const names = path.split('/').filter(Boolean);
    if (names.length === 0) return null;
    
    const buildChain = (currentId: string | null, index: number): CategoryChain | null => {
        if (index >= names.length) return null;
        
        const candidates = currentId === null 
            ? state.rootIds.filter(id => id.startsWith(`${owner}@`))
            : (state.byParentId[currentId] || []).filter(id => id.startsWith(`${owner}@`));
        
        const matchedId = candidates.find(id => 
            state.byId[id]?.name === names[index]
        );
        
        if (!matchedId) return null;
        
        const category = state.byId[matchedId];
        if (!category) return null;
        
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

const getTreeFromStore = (
    state: CategoryState,
    owner: string,
    path: string
): CategoryTree | null => {
    const names = path.split('/').filter(Boolean);
    if (names.length === 0) return null;
    
    const findNode = (currentId: string | null, index: number): CategoryTree | null => {
        if (index >= names.length) return null;
        
        const candidates = currentId === null 
            ? state.rootIds.filter(id => id.startsWith(`${owner}@`))
            : (state.byParentId[currentId] || []).filter(id => id.startsWith(`${owner}@`));
        
        const matchedId = candidates.find(id => 
            state.byId[id]?.name === names[index]
        );
        
        if (!matchedId) return null;
        
        const category = state.byId[matchedId];
        if (!category) return null;
        
        if (index === names.length - 1) {
            const buildFullTree = (id: string): CategoryTree => {
                const cat = state.byId[id];
                return {
                    name: cat.name,
                    children: (state.byParentId[id] || []).map(buildFullTree),
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

const getHierarchyFromStore = (
    state: CategoryState,
    owner: string
): CategoryHierarchy | null => {
    const ownerRootIds = state.rootIds.filter(id => id.startsWith(`${owner}@`));
    if (ownerRootIds.length === 0) return null;
    
    const buildTree = (id: string): CategoryTree => {
        const category = state.byId[id];
        return {
            name: category.name,
            children: (state.byParentId[id] || []).map(buildTree),
        };
    };
    
    return {
        roots: ownerRootIds.map(buildTree),
    };
};

const sortChildrenFromStore = (
    state: CategoryState,
    parentId: string | null
): string[] => {
    const childIds = parentId === null 
        ? [...state.rootIds]
        : [...(state.byParentId[parentId] || [])];
    
    return childIds.sort((a, b) => {
        const categoryA = state.byId[a];
        const categoryB = state.byId[b];
        
        if (!categoryA || !categoryB) return 0;
        
        const aHasChildren = (state.byParentId[a]?.length || 0) > 0;
        const bHasChildren = (state.byParentId[b]?.length || 0) > 0;
        
        if (aHasChildren !== bHasChildren) {
            return aHasChildren ? -1 : 1;
        }
        
        return categoryA.name.localeCompare(categoryB.name);
    });
};

const sortRecursiveFromStore = (
    state: CategoryState,
    parentId: string | null,
    owner: string
) => {
    const childIds = parentId === null
        ? state.rootIds.filter(id => id.startsWith(`${owner}@`))
        : (state.byParentId[parentId] || []).filter(id => id.startsWith(`${owner}@`));
    
    const sorted = sortChildrenFromStore(state, parentId);
    
    if (parentId === null) {
        // Sadece owner'a ait rootIds'leri güncelle
        const otherRoots = state.rootIds.filter(id => !id.startsWith(`${owner}@`));
        state.rootIds = [...otherRoots, ...sorted.filter(id => id.startsWith(`${owner}@`))];
    } else if (parentId && parentId.startsWith(`${owner}@`)) {
        state.byParentId[parentId] = sorted;
    }
    
    childIds.forEach(childId => {
        if (state.byParentId[childId] && state.byParentId[childId].length > 0) {
            sortRecursiveFromStore(state, childId, owner);
        }
    });
};