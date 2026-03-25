export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {

}

export interface ComponentContainerProps extends ComponentProps {
    children: React.ReactNode
}