import { Breadcrumbs } from "@/src/modules/ui-base/components/Breadcrumbs";
import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export function WorkspaceBoardCategoriesBreadcrumb({ categories } : { categories: string[] }) {
    const categoryItems = categories.map((category) => ({
        name: category,
    }));

    return (
        <Box
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0.5,
                pl: 1.5,
                userSelect: "none",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.2s",
                "&:hover": {
                    backgroundColor: "action.hover"
                }
            }}
        >
            {categories.length === 0 ? (
                <Typography
                    sx={{
                        color: "text.secondary"
                    }}
                >
                    Select Category
                </Typography>
            ): (           
                <Breadcrumbs                 
                    sx={{
                        '& .MuiBreadcrumbs-separator': {
                            marginX: 1
                        },
                    }}
                    items={categoryItems} 
                    separator=">"
                />
            )}
            <ArrowDropDownIcon sx={{
                pl: 0.5,
                pr: 1
            }} />
        </Box>
    )
}