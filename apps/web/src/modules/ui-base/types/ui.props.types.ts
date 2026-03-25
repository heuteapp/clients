import { ReactNode } from "react";

export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {

}

export interface ComponentContainerProps extends ComponentProps {
    children: React.ReactNode
}

//

export interface BrandRootProps extends ComponentContainerProps {
    children: ReactNode;
    link?: LinkProps;
};

export interface BrandIconProps extends ComponentProps {
    size?: number;
    alt?: string;
};

export interface BrandTextProps extends ComponentProps {
    text: ReactNode;
    color?: string;
    size?: string | number;
};

export interface BrandComponentProps extends ComponentProps {
    link?: LinkProps;
}

export interface BrandPairProps extends BrandComponentProps {
    iconSize?: number;
    iconAlt?: string;
    iconStyle?: React.CSSProperties;
    text?: ReactNode;
    textColor?: string;
    textSize?: string | number;
    textStyle?: React.CSSProperties;
};

//

export interface LinkProps extends ComponentProps, LinkData {

}

export type LinkData = {
    href?: string;
    linkType?: LinkType;
}

export type LinkType = "internal" | "external";