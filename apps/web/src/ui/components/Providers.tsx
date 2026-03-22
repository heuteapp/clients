import { AppTheme } from "@/src/ui/themes/mui/AppTheme";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "../providers/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppTheme>
        <AuthProvider>
          {children}
        </AuthProvider>
      </AppTheme>
      <Analytics />
    </>
  );
}