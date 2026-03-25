import { Box } from "@mui/material";
import { HeuteIconOnlyBrand } from "@/src/modules/ui-shared/components/HeuteBrand";

export const Navbar = () => {
    return (
        <Box
            component="nav"
            sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            color: "text.primary",
            fontSize: "1.5rem",
            }}
        >
            <HeuteIconOnlyBrand 
                link={{ href: "/", linkType: "external" }}
                size={28} 
                style={{ padding: 8 }}
            />
            <Box
                component="div"
                sx={{
                    fontSize: "1.125rem",
                    color: "text.disabled",
                    fontWeight: "600",
                }}
            >
            /
            </Box>
        </Box>
    )
};