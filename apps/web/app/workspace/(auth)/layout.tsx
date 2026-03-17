"use client";

import { Stack } from "@mui/system";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100%", width: "100%", backgroundColor: "background.default" }}
    >
      {children}
    </Stack>
  )
}