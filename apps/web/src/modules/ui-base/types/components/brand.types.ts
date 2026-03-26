import { ReactNode } from "react";
import { LinkProps } from "./link.types";
import { ComponentContainerProps, ComponentProps } from "./types";

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