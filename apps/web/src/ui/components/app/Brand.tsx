import { BrandIconProps, BrandTextOnlyProps, BrandIconOnlyProps, BrandCompactProps, BrandFullProps, BrandTextProps, BrandRootProps } from "@/src/types/ui/components/app/Brand";
import { Favicon } from "@/src/ui/assets/Favicon";
import { CSSProperties } from "@mui/material";
import Link from "next/link";

const BrandRoot = ({ children, link }: BrandRootProps) => {
  const styles : CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    color: "#FFF",
    textDecoration: "none",
    userSelect: "none",
  };

  if (!link) {
    return <div style={styles}>{children}</div>;
  }

  return (
    <Link href={link} style={styles}>
      {children}
    </Link>
  );
};
const BrandIcon = ({ size = 36, alt = "HeuteApp Logo", style }: BrandIconProps) => {
  return <Favicon width={size} height={size} alt={alt} style={style} />;
};

const BrandText = ({ text, color = "#FFF", size = "1.25rem", style }: BrandTextProps) => {
  return (
    <div style={{ color, fontSize: size, paddingTop: 6, ...style }}>
      {text}
    </div>
  );
};

//

export const BrandFull = ({ iconSize = 36, iconAlt = "HeuteApp Logo", iconStyle, text = "HeuteApp", textColor = "#FFF", textSize = "1.25rem", textStyle }: BrandFullProps) => {
  return (
    <BrandRoot>
      <BrandIcon size={iconSize} alt={iconAlt} style={iconStyle} />
      <BrandText text={text} color={textColor} size={textSize} style={textStyle} />
    </BrandRoot>
  );
};

export const BrandCompact = ({ iconSize = 36, iconAlt = "HeuteApp Logo", iconStyle, text = "euteApp", textColor = "#FFF", textSize = "1.25rem", textStyle }: BrandCompactProps) => {
  return (
    <BrandRoot>
      <BrandIcon size={iconSize} alt={iconAlt} style={iconStyle} />
      <BrandText text={text} color={textColor} size={textSize} style={textStyle} />
    </BrandRoot>
  );
};

export const BrandIconOnly = ({ size = 36, alt = "HeuteApp Logo", style }: BrandIconOnlyProps) => {
  return (
    <BrandRoot>
      <BrandIcon size={size} alt={alt} style={style} />
    </BrandRoot>
  );
};

export const BrandTextOnly = ({ text = "HeuteApp", color = "#FFF", size = "1.25rem", style }: BrandTextOnlyProps) => {
  return (
    <BrandRoot>
      <BrandText text={text} color={color} size={size} style={style} />
    </BrandRoot>
  );
};