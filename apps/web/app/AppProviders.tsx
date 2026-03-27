import { AppTheme } from "@/src/modules/ui-shared/themes/mui/AppTheme";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/src/modules/ui-auth/providers/AuthProvider";
import { Suspense } from "react";
import { usePWAGuard } from "@/src/modules/ui-shared/hooks/usePWAGuard";

export function AppProviders({ children } : { children: React.ReactNode }) {
  usePWAGuard();

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