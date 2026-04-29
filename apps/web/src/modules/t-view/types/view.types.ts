export interface ViewProps {
    children?: React.ReactNode;
}

export interface ViewParams {
    props: ViewProps;
    content: (def: () => React.ReactNode) => React.ReactNode;
}