import { ReactNode } from "react";
import { HeuteLinkProps } from "./HeuteLink";

export interface BrandBaseProps {
    style?: React.CSSProperties;
}

//

export interface BrandRootProps extends BrandBaseProps {
    children: ReactNode;
    link?: HeuteLinkProps;
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

export interface BrandComponentProps extends BrandBaseProps {
    link?: HeuteLinkProps;
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

export interface BrandFullProps extends BrandPairProps {

}

export interface BrandCompactProps extends BrandPairProps {

}

//

export interface BrandIconOnlyProps extends BrandComponentProps, BrandIconProps {

}

export interface BrandTextOnlyProps extends BrandComponentProps, BrandTextProps {

}