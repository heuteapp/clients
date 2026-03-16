import { ThemeOptions } from "@mui/system";

export interface AppThemeProps {
    children: React.ReactNode;
    themeComponents?: ThemeOptions['components'];
}