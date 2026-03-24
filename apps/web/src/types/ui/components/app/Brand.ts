import { ReactNode } from "react";

export interface BrandBaseProps {
    style?: React.CSSProperties;
}

//

export interface BrandRootProps extends BrandBaseProps {
    children: ReactNode;
};

export interface BrandIconProps extends BrandBaseProps {
    size?: number;
    alt?: string;
};

export interface BrandTextProps extends BrandBaseProps {
    text: ReactNode;
    color?: string;
    size?: string | number;
};

//

export interface BrandPairProps extends BrandBaseProps {
    iconSize?: number;
    iconAlt?: string;
    iconStyle?: React.CSSProperties;
    text?: ReactNode;
    textColor?: string;
    textSize?: string | number;
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