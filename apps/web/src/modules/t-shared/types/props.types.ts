export interface TracedItemProps {
    type: string;
    data: any;
    children: React.ReactNode;
}

export interface TracingProviderProps {
    children: React.ReactNode;
}