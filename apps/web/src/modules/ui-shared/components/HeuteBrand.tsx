import { BrandRoot, BrandIcon, BrandText } from "@/src/modules/ui-base/components/Brand";
import { HeuteFullBrandProps, HeuteCompactBrandProps, HeuteIconOnlyBrandProps, HeuteTextOnlyBrandProps } from "@/src/modules/ui-shared/types/ui.props.types";

export const HeuteFullBrand = ({ link, iconSize, iconAlt, iconStyle, text = "HeuteApp", textColor, textSize, textStyle }: HeuteFullBrandProps) => {
  return (
    <BrandRoot link={link}>
      <BrandIcon size={iconSize} alt={iconAlt} style={{ padding: 6, ...iconStyle}} />
      <BrandText text={text} color={textColor} size={textSize} style={textStyle} />
    </BrandRoot>
  );
};

export const HeuteCompactBrand = ({ link, iconSize, iconAlt, iconStyle, text = "euteApp", textColor, textSize, textStyle }: HeuteCompactBrandProps) => {
  return (
    <BrandRoot link={link}>
      <BrandIcon size={iconSize} alt={iconAlt} style={iconStyle} />
      <BrandText text={text} color={textColor} size={textSize} style={textStyle} />
    </BrandRoot>
  );
};

export const HeuteIconOnlyBrand = ({ link, size, alt, style }: HeuteIconOnlyBrandProps) => {
  return (
    <BrandRoot link={link}>
      <BrandIcon size={size} alt={alt} style={style} />
    </BrandRoot>
  );
};

export const HeuteTextOnlyBrand = ({ link, text, color, size, style }: HeuteTextOnlyBrandProps) => {
  return (
    <BrandRoot link={link}>
      <BrandText text={text} color={color} size={size} style={style} />
    </BrandRoot>
  );
};