import { BrandRoot, BrandIcon, BrandText } from "@/src/modules/ui-base/components/Brand";
import { HeuteFullBrandProps, HeuteCompactBrandProps, HeuteIconOnlyBrandProps, HeuteTextOnlyBrandProps } from "@/src/modules/ui-core/types/ui.props.types";

export const HeuteFullBrand = ({ link, iconSize, iconAlt, iconProps, text = "HeuteApp", textColor, textSize, textProps, ...props }: HeuteFullBrandProps) => {
  return (
    <BrandRoot {...props} link={link}>
      <BrandIcon  {...iconProps} size={iconSize} alt={iconAlt} />
      <BrandText {...textProps} text={text} color={textColor} size={textSize} />
    </BrandRoot>
  );
};

export const HeuteCompactBrand = ({ link, iconSize, iconAlt, iconProps, text = "euteApp", textColor, textSize, textProps, ...props }: HeuteCompactBrandProps) => {
  return (
    <BrandRoot {...props} link={link}>
      <BrandIcon {...iconProps} size={iconSize} alt={iconAlt} />
      <BrandText {...textProps} text={text} color={textColor} size={textSize} />
    </BrandRoot>
  );
};

export const HeuteIconOnlyBrand = ({ link, iconSize, iconAlt, iconProps, ...props }: HeuteIconOnlyBrandProps) => {
  return (
    <BrandRoot {...props} link={link}>
      <BrandIcon {...iconProps} size={iconSize} alt={iconAlt} />
    </BrandRoot>
  );
};

export const HeuteTextOnlyBrand = ({ link, text, textColor, textSize, textProps, ...props }: HeuteTextOnlyBrandProps) => {
  return (
    <BrandRoot {...props} link={link}>
      <BrandText {...textProps} text={text} color={textColor} size={textSize} />
    </BrandRoot>
  );
};