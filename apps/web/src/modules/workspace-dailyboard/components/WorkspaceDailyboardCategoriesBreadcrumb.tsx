import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { HeuteAnimatedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";
import { styled } from "@mui/system";

export function WorkspaceDailyboardCategoriesBreadcrumb({ categories } : { categories: string[] }) {
    const categoryItems = categories.map((category) => ({
        name: category,
    }));

    return (
        <CategoriesBreadcrumb>
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