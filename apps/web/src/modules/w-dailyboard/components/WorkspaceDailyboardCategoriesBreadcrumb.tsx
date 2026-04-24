"use clients";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Stack, TextField, Typography, styled } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { HeuteAnimatedBreadcrumbs } from "../../ui-core/components/HeuteBreadcrumbs";
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/src/heute-store/stores/category.store";
import { usePathname, useRouter } from "next/navigation";
import { CategoriesBreadcrumbProps, CategoryMenuProps, CategoryTreeItemProps, CategoryTreeViewProps } from "../types/components/workspace-dailyboard.categories-breadcrumb.types";
import { alpha } from "@mui/system";

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
            <NewCategoryItem />
        </Menu>
    )
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    width: "auto",
    margin: theme.spacing(0, 1),
}));

//

function CategoryTreeView({ anchor }: CategoryTreeViewProps) {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const { getMeRoots, getMeChildren } = useCategoryStore();

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if(!anchor.value) return;

        const currentPath = pathname.substring('/workspace/dailyboard/'.length);
        if (!currentPath) {
            setExpandedItems([]);
            setSelectedItem(null);
            return;
        }
        
        const parts = currentPath.split('/').filter(Boolean);
        const newExpandedItems: string[] = [];
        let current = '';
        let lastItem = '';
        
        for (let i = 0; i < parts.length; i++) {
            current = current ? `${current}/${parts[i]}` : parts[i];
            const itemId = `me@${current}`;
            newExpandedItems.push(itemId);
            lastItem = itemId;
        }
        
        setExpandedItems(newExpandedItems);
        setSelectedItem(lastItem);
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
        <StyledTreeView
            expandedItems={expandedItems}
            onExpandedItemsChange={handleExpandedItemsChange}
            selectedItems={selectedItem}
            onSelectedItemsChange={(_, itemIds) => {
                setSelectedItem(itemIds as string);
            }}
            slots={{
                expandIcon: ExpandIcon,
                collapseIcon: CollapseIcon,
                endIcon: EndIcon,
            }}
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
        </StyledTreeView>
    );
}

const StyledTreeView = styled(SimpleTreeView)(({ theme }) => ({
    minHeight: 160,
    maxHeight: 320,
    margin: theme.spacing(1, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
    overflowY: "auto",
    '&::-webkit-scrollbar': {
        width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: alpha(theme.palette.text.primary, 0.2),
        borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: alpha(theme.palette.text.primary, 0.3),
    },
}));

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
        width: "auto",
        height: 32,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(0, 1),
        margin: theme.spacing(0, 1, 1, 1),
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: theme.spacing(3),
        paddingLeft: theme.spacing(0.5),
        position: "relative",

        "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: theme.spacing(1),
            width: 1,
            borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
        },
    },
}));

import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

function ExpandIcon(props: React.PropsWithoutRef<typeof AddBoxRoundedIcon>) {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(
  props: React.PropsWithoutRef<typeof IndeterminateCheckBoxRoundedIcon>,
) {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(props: React.PropsWithoutRef<typeof CategoryOutlinedIcon>) {
  return <CategoryOutlinedIcon {...props} sx={{ opacity: 0.8 }} />;
}

//

import AddIcon from '@mui/icons-material/Add';
import { heuteApi } from "@/src/api/heuteApi";
import React from "react";

function NewCategoryItem() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [levels, setLevels] = useState(['', '', '']);
    const router = useRouter();

    const activeLevel = levels.findIndex(level => !level.trim());
    const { sortMe, initializeCategory } = useCategoryStore();

    const handleClickOpen = () => {
        setOpen(true);
        setLevels(['', '', '']);
    };

    const handleClose = () => {
        if (!loading) {
            setOpen(false);
            setLevels(['', '', '']);
        }
    };

    const getFullPath = () => levels.filter(Boolean).join('/');

    const handleLevelChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLevels = [...levels];
        newLevels[index] = e.target.value;
        setLevels(newLevels);
    };

    const handleKeyDown = (index: number) => (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const currentValue = levels[index].trim();
            
            if (currentValue && index < levels.length - 1) {
                const nextInput = document.querySelector<HTMLInputElement>(`input[data-level="${index + 1}"]`);
                nextInput?.focus();
            } else if (getFullPath()) {
                handleCreate();
            }
        }
    };

    const handleCreate = async () => {
        const fullPath = getFullPath();
        if (!fullPath) return;
        
        setLoading(true);
        try {
            await heuteApi.me.categories.create(fullPath);

            initializeCategory(fullPath);
            sortMe();

            router.push(`/workspace/dailyboard/${fullPath}`);
            handleClose();

        } catch (error) {
            console.error('Category creation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = (index: number) => {
        if (loading) return true;
        if (index === 0) return false;
        return !levels[index - 1].trim();
    };

    return (
        <>
            <StyledMenuItem onClick={handleClickOpen}>
                <AddIcon color="disabled" sx={{ mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                    New Category
                </Typography>
            </StyledMenuItem>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create Category Path</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {levels.map((level, index) => (
                                <React.Fragment key={index}>
                                    <TextField
                                        autoFocus={activeLevel === index}
                                        placeholder={"Name"}
                                        value={level}
                                        onChange={handleLevelChange(index)}
                                        onKeyDown={handleKeyDown(index)}
                                        disabled={isDisabled(index)}
                                        sx={{ flex: 1 }}
                                        size="small"
                                    />
                                    {index < levels.length - 1 && (
                                        <Typography variant="h6" color="text.secondary">
                                            /
                                        </Typography>
                                    )}
                                </React.Fragment>
                            ))}
                        </Box>

                        {getFullPath() && (
                            <Alert sx={{ mt: 1 }}>
                                <strong>Full Path:</strong> {getFullPath()}
                            </Alert>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleCreate} 
                        variant="contained"
                        disabled={loading || !getFullPath()}
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}