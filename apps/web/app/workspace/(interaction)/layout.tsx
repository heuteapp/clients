'use client';

import { useRef } from "react";
import Box from "@mui/material/Box";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import Content from "./content";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Navbar />
      <Content>
        {children}
      </Content>
    </Box>
  )
}