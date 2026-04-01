import { Box, Menu, MenuItem, Typography, Collapse } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { HeuteAnimatedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { styled } from "@mui/system";
import { useState } from "react";
import { useCategoryStore } from "@/src/heute-store/stores/category.store";
import { Category } from "@/src/modules/category/types/category.types";
import { StoredCategory } from "@/src/heute-store/types/category.types";

export function WorkspaceDailyboardCategoriesBreadcrumb({ categories } : { categories: string[] }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const categoryItems = categories.map((category) => ({
        name: category,
    }));

    const { getMeRoots, getMeChildren } = useCategoryStore();
    const roots = getMeRoots();

    return (
        <>
            <CategoriesBreadcrumb onClick={handleClick}>
                {categories.length === 0 ? (
                    <SelectCategoryPlaceholder>
                        Select a category
                    </SelectCategoryPlaceholder>
                ): (           
                    <HeuteAnimatedBreadcrumbs   
                        duration={0.2}
                        delay={0}
                        offset={10}              
                        sx={{
                            '& .MuiBreadcrumbs-separator': {
                                marginX: 1
                            },
                        }}
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
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 250
                        }
                    }
                }}
            >
                {roots.map((category) => (
                    <CategoryMenuItem 
                        key={category.id} 
                        categoryId={category.id} 
                        onClose={handleClose}
                        getMeChildren={getMeChildren}
                    />
                ))}
            </Menu>
        </>
    )
}

// Menu Item Component
function CategoryMenuItem({ categoryId, onClose, getMeChildren }: { 
    categoryId: string; 
    onClose: () => void;
    getMeChildren: (parentId: string | null) => StoredCategory[];
}) {
    const [open, setOpen] = useState(false);
    const category = useCategoryStore(state => state.me?.byId[categoryId]);
    const children = getMeChildren(categoryId);
    const hasChildren = children.length > 0;

    if (!category) return null;

    const handleClick = () => {
        if (hasChildren) {
            setOpen(!open);
        } else {
            onClose();
            console.log("Selected category:", category.name);
        }
    };

    return (
        <>
            <StyledMenuItem onClick={handleClick}>
                <Typography variant="body2">{category.name}</Typography>
                {hasChildren && (
                    open ? <ArrowDropDownIcon fontSize="small" /> : <ArrowRightIcon fontSize="small" />
                )}
            </StyledMenuItem>
            
            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ pl: 2 }}>
                        {children.map((child) => (
                            <CategoryMenuItem 
                                key={child.id} 
                                categoryId={child.id} 
                                onClose={onClose}
                                getMeChildren={getMeChildren}
                            />
                        ))}
                    </Box>
                </Collapse>
            )}
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

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    justifyContent: "space-between",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
}));