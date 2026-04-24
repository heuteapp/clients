export interface TracedItemPropsBase {
    type: string;
    data?: any;
    ref: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
}

export interface TracedItemProps extends TracedItemPropsBase {
    id: string | null;
}

export interface TracedUniqueItemProps extends TracedItemPropsBase {
    
}

export interface TracingDomainProviderProps {
    name: string;
    children: React.ReactNode;
}

export interface TracingStoreProviderProps {
    children: React.ReactNode;
}