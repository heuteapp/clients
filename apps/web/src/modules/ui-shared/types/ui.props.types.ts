import { LinkProps } from "@/src/modules/ui-base/types/components/link.types";
import { BrandPairProps, BrandComponentProps, BrandIconProps, BrandTextProps } from "@/src/modules/ui-base/types/components/brand.types";

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