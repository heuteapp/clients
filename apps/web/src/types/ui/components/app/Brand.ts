import { ReactNode } from "react";

export interface BrandBaseProps {
    style?: React.CSSProperties;
}

//

export interface BrandRootProps extends BrandBaseProps {
    children: ReactNode;
};

export interface BrandIconProps extends BrandBaseProps {
    width?: number;
    height?: number;
    alt?: string;
};

export interface BrandTextProps extends BrandBaseProps {
    text: ReactNode;
};

//

export interface BrandPairProps extends BrandBaseProps {
    style?: React.CSSProperties;
    iconWidth?: number;
    iconHeight?: number;
    iconAlt?: string;
    iconStyle?: React.CSSProperties;
    text?: ReactNode;
    textStyle?: React.CSSProperties;
};

export interface BrandFullProps extends BrandPairProps {

}

export interface BrandCompactProps extends BrandPairProps {

}

//

export interface BrandIconOnlyProps extends BrandIconProps {

}

export interface BrandTextOnlyProps extends BrandTextProps {

}