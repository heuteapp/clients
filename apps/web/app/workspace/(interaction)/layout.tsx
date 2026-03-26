'use client';

import Box from "@mui/material/Box";

import { useWorkspaceType } from "@/src/modules/workspace/hooks/useWorkspaceType";
import { WorkspaceBoardProvider } from "@/src/modules/workspace-board/providers/WorkspaceBoardProvider";
import { Navbar } from "./navbar";
import Content from "./content";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const type = useWorkspaceType();

  const content = <LayoutContent>{children}</LayoutContent>;

  return (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: "background.paper",
      }}
    >
      {type === "board" ? (
        <WorkspaceBoardProvider>{content}</WorkspaceBoardProvider>
      ) : (
        content
      )}
    </Box>
  )
}

const LayoutContent = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <Content>{children}</Content>
  </>
);