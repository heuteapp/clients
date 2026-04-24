import { LinkProps } from "@/src/modules/ui-base/types/components/link.types";
import { BrandPairProps, BrandComponentProps, BrandHasIconProps, BrandHasTextProps } from "@/src/modules/ui-base/types/components/brand.types";

export interface HeuteFullBrandProps extends BrandComponentProps, BrandPairProps {
    link?: HeuteLinkProps;
}

export interface HeuteCompactBrandProps extends BrandComponentProps, BrandPairProps {
    link?: HeuteLinkProps;
}

export interface HeuteIconOnlyBrandProps extends BrandComponentProps, BrandHasIconProps {
    link?: HeuteLinkProps;
}

export interface HeuteTextOnlyBrandProps extends BrandComponentProps, BrandHasTextProps {
    link?: HeuteLinkProps;
}

//

export interface HeuteLinkProps extends LinkProps {
    
}