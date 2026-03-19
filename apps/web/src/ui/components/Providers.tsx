import { AppTheme } from "@/src/ui/themes/mui/AppTheme";
import { Analytics } from "@vercel/analytics/next";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppTheme>
            {children}
      </AppTheme>
      <Analytics />
    </>
  );
}