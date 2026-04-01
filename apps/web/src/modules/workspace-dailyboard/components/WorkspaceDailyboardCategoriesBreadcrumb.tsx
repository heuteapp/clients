import { Box, Menu, MenuItem, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { HeuteAnimatedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { styled } from "@mui/system";
import { useState } from "react";

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
                >
                    {categories.map((category, index) => (
                        <MenuItem key={index} onClick={handleClose}>
                            {category}
                        </MenuItem>
                    ))}
            </Menu>
        </>
    )
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