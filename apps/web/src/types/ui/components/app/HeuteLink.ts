export interface HeuteLinkProps {
    children: React.ReactNode;
    href?: string;
    type?: HeuteLinkType;
    style?: React.CSSProperties;
}

export type HeuteLinkData = Exclude<HeuteLinkProps, "children">;

export type HeuteLinkType = "internal" | "external";