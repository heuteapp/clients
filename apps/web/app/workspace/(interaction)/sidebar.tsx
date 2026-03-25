import { Box } from "@mui/material"

export const Sidebar = () => {
    return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            width: 80,
            backgroundColor: "green",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "lightgray",
                margin: 2,
              }}
            />
          ))}
        </Box>
    )
}