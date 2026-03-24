import { ComponentProps } from "@/src/types/ui/components/shared/app/Component";

export interface HeuteLinkProps extends ComponentProps, HeuteLinkData {
    
}

export type HeuteLinkData = {
    href?: string;
    type?: HeuteLinkType;
}

export type HeuteLinkType = "internal" | "external";