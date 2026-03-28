import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { HeuteAnimatedBreadcrumbs } from "../../ui-shared/components/HeuteBreadcrumbs";

export function WorkspaceDailyboardCategoriesBreadcrumb({ categories } : { categories: string[] }) {
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
            <ArrowDropDownIcon sx={{
                pl: 0.5,
                pr: 1
            }} />
        </Box>
    )
}