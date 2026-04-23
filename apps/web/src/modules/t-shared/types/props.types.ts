export interface TracedItemPropsBase {
    type: string;
    data: any;
    ref: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
}

export interface TracedItemProps extends TracedItemPropsBase {
    id: string;
}

export interface TracedRootItemProps extends TracedItemPropsBase {
    
}

export interface TracingProviderProps {
    children: React.ReactNode;
}