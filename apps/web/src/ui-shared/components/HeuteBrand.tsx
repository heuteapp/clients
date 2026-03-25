import { CSSProperties } from "@mui/material";
import { HeuteLink } from "./HeuteLink";
import { BrandRootProps, BrandIconProps, BrandTextProps } from "@/src/ui-base/types/ui.props.types";
import { HeuteFullBrandProps, HeuteCompactBrandProps, HeuteIconOnlyBrandProps, HeuteTextOnlyBrandProps } from "@/src/ui-shared/types/ui.props.types";

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

//

const BrandRoot = ({ children, link }: BrandRootProps) => {
  const styles : CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    color: "#FFF",
    textDecoration: "none",
    userSelect: "none",
  };

  return (
    <HeuteLink href={link?.href} linkType={link?.linkType} style={{...styles, ...link?.style}}>
      {children}
    </HeuteLink>
  )
};

const BrandIcon = ({ size = 36, alt = "HeuteApp Logo", style }: BrandIconProps) => {
  return  (
    <img
      src="/assets/favicon.svg"
      alt={alt}
      width={size}
      height={size}
      //className={className}
      style={{
        ...style,
      }}
    />
  )
};

const BrandText = ({ text, color = "#eaeaea", size = "1.25rem", style }: BrandTextProps) => {
  return (
    <div style={{ 
      color, 
      fontWeight: "600",
      fontSize: size, 
      ...style 
    }}>
      {text}
    </div>
  );
};