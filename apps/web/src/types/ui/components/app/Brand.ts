import { ReactNode } from "react";

export interface BrandBaseProps {
    style?: React.CSSProperties;
}

//

export interface BrandIconProps extends BrandBaseProps {
    width?: number;
    height?: number;
    alt?: string;
};

export interface BrandTextProps extends BrandBaseProps {
    text: ReactNode;
};

//

export interface BrandFullProps extends BrandBaseProps {
    iconWidth?: number;
    iconHeight?: number;
    iconAlt?: string;
    iconStyle?: React.CSSProperties;
    text?: ReactNode;
    textStyle?: React.CSSProperties;
};