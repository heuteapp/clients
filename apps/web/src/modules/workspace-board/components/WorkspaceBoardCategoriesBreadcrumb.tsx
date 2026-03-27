import { Breadcrumbs } from "@/src/modules/ui-base/components/Breadcrumbs";
import { Box, Typography } from "@mui/material";

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
                px: 2,
                userSelect: "none",
                display: "flex",
                justifyContent: "center",
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
        </Box>
    )
}