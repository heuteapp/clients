'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { WorkspaceDailyboardProvider } from '@/src/modules/workspace-dailyboard/providers/WorkspaceDailyboardProvider';
import { WorkspaceProvider } from '@/src/modules/workspace/providers/WorkspaceProvider';
import { useWorkspaceContext } from '@/src/modules/workspace/hooks/useWorkspaceContext';
import { WorkspaceBreadcrumbs } from '@/src/modules/workspace/components/WorkspaceBreadcrumbs';
import { LayoutSidebar } from './sidebar';

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box
      sx={{
        minHeight: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <WorkspaceProvider>
        <LayoutContainer>{children}</LayoutContainer>
      </WorkspaceProvider>
    </Box>
  );
}

function LayoutContainer({ children }: { children: React.ReactNode }) {
  const { metadata } = useWorkspaceContext();
  const { type } = metadata;

  const content = <LayoutContent>{children}</LayoutContent>;

  if (type === 'dailyboard') {
    return <WorkspaceDailyboardProvider>{content}</WorkspaceDailyboardProvider>;
  }

  return content;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutNavbar />
      <Stack direction="row" sx={{ width: '100%', height: 'calc(100dvh - 49px)' }}>
        <LayoutSidebar />
        <LayoutMonitor>{children}</LayoutMonitor>
      </Stack>
    </>
  );
}

function LayoutNavbar() {
  return (
    <Box
      component="nav"
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        width: '100%',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'text.primary',
        fontSize: '1.5rem',
      }}
    >
      <WorkspaceBreadcrumbs />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pr: 1 }} />
    </Box>
  );
}

function LayoutMonitor({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'transparent',
      }}
    >
      {children}
    </Box>
  );
}