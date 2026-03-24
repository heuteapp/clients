import { BrandIconProps, BrandTextOnlyProps, BrandIconOnlyProps, BrandCompactProps, BrandFullProps, BrandTextProps, BrandRootProps } from "@/src/types/ui/components/app/Brand";
import { Favicon } from "@/src/ui/assets/Favicon";
import { CSSProperties } from "@mui/material";
import Link from "next/link";

const BrandRoot = ({ children, link, linkType }: BrandRootProps) => {
  linkType = linkType || "client";

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

  if(linkType === "client") {
    return (
      <Link href={link} style={styles}>
        {children}
      </Link>
    );
  }

  if(linkType === "server") {
    return (
      <a href={link} style={styles}>
        {children}
      </a>
    );
  }

  throw new Error(`Invalid linkType: ${linkType}. Expected "client" or "server".`);
};
const BrandIcon = ({ size = 36, alt = "HeuteApp Logo", style }: BrandIconProps) => {
  return <Favicon width={size} height={size} alt={alt} style={style} />;
};

const BrandText = ({ text, color = "#eaeaea", size = "1.25rem", style }: BrandTextProps) => {
  return (
    <div style={{ 
      color, 
      fontWeight: "600",
      fontSize: size, 
      paddingTop: 6,
      ...style 
    }}>
      {text}
    </div>
  );
};

//

export const BrandFull = ({ link, linkType, iconSize = 36, iconAlt, iconStyle, text = "HeuteApp", textColor, textSize, textStyle }: BrandFullProps) => {
  return (
    <BrandRoot link={link} linkType={linkType}>
      <BrandIcon size={iconSize} alt={iconAlt} style={{ padding: 6, ...iconStyle}} />
      <BrandText text={text} color={textColor} size={textSize} style={textStyle} />
    </BrandRoot>
  );
};

export const BrandCompact = ({ link, linkType, iconSize = 36, iconAlt, iconStyle, text = "euteApp", textColor, textSize, textStyle }: BrandCompactProps) => {
  return (
    <BrandRoot link={link} linkType={linkType}>
      <BrandIcon size={iconSize} alt={iconAlt} style={iconStyle} />
      <BrandText text={text} color={textColor} size={textSize} style={textStyle} />
    </BrandRoot>
  );
};

export const BrandIconOnly = ({ link, linkType, size, alt, style }: BrandIconOnlyProps) => {
  return (
    <BrandRoot link={link} linkType={linkType}>
      <BrandIcon size={size} alt={alt} style={style} />
    </BrandRoot>
  );
};

export const BrandTextOnly = ({ link, linkType, text = "HeuteApp", color, size, style }: BrandTextOnlyProps) => {
  return (
    <BrandRoot link={link} linkType={linkType}>
      <BrandText text={text} color={color} size={size} style={style} />
    </BrandRoot>
  );
};