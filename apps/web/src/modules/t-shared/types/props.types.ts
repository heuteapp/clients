export interface TracedItemProps {
    type: string;
    key: string;
    data: any;
    ref: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
}

export interface TracingProviderProps {
    children: React.ReactNode;
}