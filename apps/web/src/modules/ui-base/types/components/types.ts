import { Theme } from "@emotion/react"
import { SxProps } from "@mui/system"

export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
    sx?: SxProps<Theme>
}

export interface ComponentContainerProps extends ComponentProps {
    children: React.ReactNode
}