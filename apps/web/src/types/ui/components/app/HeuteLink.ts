import { ComponentProps } from "@/src/types/ui/components/shared/app/Component";

export interface HeuteLinkProps extends ComponentProps, HeuteLinkData {
    
}

export type HeuteLinkData = {
    href?: string;
    linkType?: HeuteLinkType;
}

export type HeuteLinkType = "internal" | "external";