"use client";
import { Box } from "@mui/material"
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();

    return (
        <Box
          sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: 128,
    backgroundColor: "grey.800",
    borderRight: 1,
    borderColor: "divider",
    overflowY: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none"
    },
    overflowX: "hidden"
  }}
        >
<Box sx={{ 
    marginTop: "auto",    // Yukarıdan it
    marginBottom: "auto", // Aşağıdan it → ortalar
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }}>

          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: 96,
                height: 64,
                backgroundColor: "lightgray",
                margin: 2,
                textAlign: "center",
                lineHeight: "64px",
                borderRadius: 1,
                userSelect: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push("/workspace/board" + item.link);
              }}
            >
              {item.name}
            </Box>
          ))}
          </Box>
        </Box>
    )
}

const items = [
    { id: 1, name: "School", link: "/school" },
    { id: 2, name: "History", link: "/school/grade2/history" },
    { id: 3, name: "Math", link: "/math" },
    { id: 4, name: "Science", link: "/science" },
    { id: 5, name: "English", link: "/english" },
    { id: 6, name: "Other", link: "/other" },
    { id: 7, name: "Personal", link: "/personal/learning" },
    { id: 8, name: "Work", link: "/work" },
];