import { AppTheme } from "@/src/ui/themes/mui/AppTheme";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "../providers/AuthProvider";
import { Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppTheme>
        <Suspense fallback={null}>

          <AuthProvider>
            {children}
          </AuthProvider>
        </Suspense>
      </AppTheme>
      <Analytics />
    </>
  );
}