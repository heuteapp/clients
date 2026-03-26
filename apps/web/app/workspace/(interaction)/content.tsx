import { Box } from "@mui/material";
import { Sidebar } from "./sidebar";

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <Box
        sx={{
            width: "100%",
            height: "calc(100dvh - 49px)",
            display: "flex",
            flexDirection: "row",
            bgcolor: "transparent"
        }}
    >
        <Sidebar />
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {children}
        </Box>
    </Box>
  );
}