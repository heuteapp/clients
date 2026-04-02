"use clients";
import { Box, Menu, Typography, styled } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { HeuteAnimatedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/src/heute-store/stores/category.store";
import { StoredCategory } from "@/src/heute-store/types/category.types";
import { usePathname, useRouter } from "next/navigation";
import { CategoriesBreadcrumbProps, CategoryMenuProps, CategoryTreeItemProps, CategoryTreeViewProps } from "../types/components/workspace-dailyboard.categories-breadcrumb.types";

export function WorkspaceDailyboardCategoriesBreadcrumb({ categories }: CategoriesBreadcrumbProps) {
    const [breadcrumbEl, setBreadcrumbEl] = useState<null | HTMLElement>(null);
    const categoryItems = categories.map((category) => ({ name: category }));

    return (
        <>
            <CategoriesBreadcrumb onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                setBreadcrumbEl(event.currentTarget);
            }}>
                {categories.length === 0 ? (
                    <SelectCategoryPlaceholder>Select a category</SelectCategoryPlaceholder>
                ) : (
                    <HeuteAnimatedBreadcrumbs
                        duration={0.2}
                        delay={0}
                        offset={10}
                        sx={{ '& .MuiBreadcrumbs-separator': { marginX: 1 } }}
                        items={categoryItems}
                        separator=">"
                    />
                )}
                <DropDownIcon />
            </CategoriesBreadcrumb>

            <CategoryMenu anchor={{ value: breadcrumbEl, set: setBreadcrumbEl }} />
        </>
    );
}

const CategoriesBreadcrumb = styled(Box)(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.divider,
    borderRadius: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    userSelect: "none",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
        backgroundColor: theme.palette.action.hover
    }
}));

const SelectCategoryPlaceholder = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary
}));

const DropDownIcon = styled(ArrowDropDownIcon)(({ theme }) => ({
    padding: `0 ${theme.spacing(1)} 0 ${theme.spacing(0.5)}`,
    color: theme.palette.text.secondary
}));


//


function CategoryMenu({ anchor }: CategoryMenuProps) {

    return(
        <Menu
            anchorEl={anchor.value}
            open={Boolean(anchor.value)}
            onClose={() => anchor.set(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{ 
                paper: { 
                    sx: { 
                        minWidth: 200, 
                        width: anchor.value ? anchor.value.offsetWidth : 'auto',
                        maxHeight: 400,
                        border: "1px solid",
                        borderColor: 'divider',
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04))',
                        borderRadius: 0.5,
                        marginTop: 1,
                        [`& .${treeItemClasses.content}`]: {
                            borderRadius: 0
                        }
                    } 
                } 
            }}
        >
            <CategoryTreeView anchor={anchor} />
        </Menu>
    )
}

//

function CategoryTreeView({ anchor }: CategoryTreeViewProps) {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const { getMeRoots, getMeChildren } = useCategoryStore();


    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if(!anchor.value) return;

        const currentPath = pathname.substring('/workspace/dailyboard/'.length);
        if (!currentPath) {
            setExpandedItems([]);
            return;
        }
        
        const parts = currentPath.split('/').filter(Boolean);
        const newExpandedItems: string[] = [];
        let current = '';
        
        for (let i = 0; i < parts.length; i++) {
            current = current ? `${current}/${parts[i]}` : parts[i];
            newExpandedItems.push(`me@${current}`);
        }
        
        setExpandedItems(newExpandedItems);
    }, [anchor.value, pathname]);

    const handleExpandedItemsChange = (event: unknown, itemIds: string[]) => {
        const newlyExpanded = itemIds.find(id => !expandedItems.includes(id));
        
        if (newlyExpanded) {
            const parts = newlyExpanded.split('/');
            const allParents: string[] = [];
            
            for (let i = 1; i < parts.length; i++) {
            allParents.push(parts.slice(0, i).join('/'));
            }
            
            setExpandedItems([...allParents, newlyExpanded]);
        } else {
            setExpandedItems(itemIds);
        }
    };

    return (
        <SimpleTreeView
            expandedItems={expandedItems}
            onExpandedItemsChange={handleExpandedItemsChange}
        >
            {getMeRoots().map((category) => (
                <CategoryTreeItem 
                    key={category.id} 
                    category={category} 
                    getMeChildren={getMeChildren}
                    onSelect={(categoryId: string) => {
                        router.push(`/workspace/dailyboard/${categoryId.slice(3)}`);
                        anchor.set(null);
                    }}
                />
            ))}
        </SimpleTreeView>
    );
}

//

function CategoryTreeItem({ category, getMeChildren, onSelect }: CategoryTreeItemProps) {
    const children = getMeChildren(category.id);
    const hasChildren = children.length > 0;

    return (
        <StyledTreeItem 
            itemId={category.id} 
            label={category.name}
            onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                
                if (!hasChildren) {
                    onSelect(category.id);
                }
            }}
        >
            {hasChildren && children.map((child) => (
                <CategoryTreeItem 
                    key={child.id} 
                    category={child} 
                    getMeChildren={getMeChildren}
                    onSelect={onSelect}
                />
            ))}
        </StyledTreeItem>
    );
}

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.content}`]: {
        borderRadius: theme.spacing(0.5),
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    [`& .${treeItemClasses.label}`]: {
        fontSize: '0.875rem',
    }
}));