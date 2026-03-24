export interface HeuteLinkProps {
    children: React.ReactNode;
    href?: string;
    type?: "internal" | "external";
    style?: React.CSSProperties;
}