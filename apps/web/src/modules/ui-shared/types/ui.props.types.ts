import { BrandComponentProps, BrandIconProps, BrandPairProps, BrandTextProps, LinkProps } from "@/src/ui-base/types/ui.props.types";

//

export interface HeuteFullBrandProps extends BrandPairProps {
    link?: HeuteLinkProps;
}

export interface HeuteCompactBrandProps extends BrandPairProps {
    link?: HeuteLinkProps;
}

export interface HeuteIconOnlyBrandProps extends BrandComponentProps, BrandIconProps {
    link?: HeuteLinkProps;
}

export interface HeuteTextOnlyBrandProps extends BrandComponentProps, BrandTextProps {
    link?: HeuteLinkProps;
}

//

export interface HeuteLinkProps extends LinkProps {
    
}