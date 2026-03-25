import { ComponentProps } from "@/src/ui-base/types/ui.props.types";

export interface HeuteLinkProps extends ComponentProps, HeuteLinkData {
    
}

export type HeuteLinkData = {
    href?: string;
    linkType?: HeuteLinkType;
}

export type HeuteLinkType = "internal" | "external";