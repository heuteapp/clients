"use clients";
import { Box, Menu, Typography, styled } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { HeuteAnimatedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { useState } from "react";
import { useCategoryStore } from "@/src/heute-store/stores/category.store";
import { StoredCategory } from "@/src/heute-store/types/category.types";
import { useRouter } from "next/navigation";

export function WorkspaceDailyboardCategoriesBreadcrumb({ categories }: { categories: string[] }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { getMeRoots, getMeChildren } = useCategoryStore();
    const roots = getMeRoots();

    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (categoryId: string) => {
        router.push(`/workspace/dailyboard/${categoryId.slice(3)}`);
        handleClose();
    };

    const categoryItems = categories.map((category) => ({ name: category }));

    return (
        <>
            <CategoriesBreadcrumb onClick={handleClick}>
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

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                slotProps={{ 
                    paper: { 
                        sx: { 
                            width: 250, 
                            maxHeight: 400,
                            [`& .${treeItemClasses.content}`]: {
                                borderRadius: 0
                            }
                        } 
                    } 
                }}
            >
                <SimpleTreeView>
                    {roots.map((category) => (
                        <CategoryTreeItem 
                            key={category.id} 
                            category={category} 
                            getMeChildren={getMeChildren}
                            onSelect={handleSelect}
                        />
                    ))}
                </SimpleTreeView>
            </Menu>
        </>
    );
}

// Recursive TreeItem
function CategoryTreeItem({ 
    category, 
    getMeChildren,
    onSelect 
}: { 
    category: StoredCategory; 
    getMeChildren: (parentId: string | null) => StoredCategory[];
    onSelect: (categoryId: string) => void;
}) {
    const children = getMeChildren(category.id);
    const hasChildren = children.length > 0;

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Event propagation'ı durdur
        
        if (!hasChildren) {
            // Sadece leaf node ise seç
            onSelect(category.id);
        }
        // Parent ise hiçbir şey yapma - MUI X zaten açılma/kapanmayı yönetir
    };

    return (
        <TreeItem 
            itemId={category.id} 
            label={category.name}
            onClick={handleClick}
            sx={{
                '& .MuiTreeItem-label': {
                    fontSize: '0.875rem',
                    py: 0.5,
                    cursor: 'pointer',
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
        </TreeItem>
    );
}

// Styled Components
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