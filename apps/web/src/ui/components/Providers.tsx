import { AppTheme } from "@/src/ui/themes/mui/AppTheme";
import { AuthProvider } from "./AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppTheme>
    <AuthProvider>
        {children}
    </AuthProvider>
    </AppTheme>
  );
}