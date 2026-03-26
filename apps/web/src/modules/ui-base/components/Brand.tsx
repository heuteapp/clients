import { CSSProperties } from "react";
import { Link } from "./Link";
import { BrandIconProps, BrandRootProps, BrandTextProps } from "@/src/modules/ui-base/types/components/brand.types";

//

export const BrandRoot = ({ children, link, ...props }: BrandRootProps) => {
  const styles : CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    color: "#FFF",
    textDecoration: "none",
    userSelect: "none",
  };

  return (
    <Link {...props} href={link?.href} linkType={link?.linkType} style={{...styles, ...link?.style}}>
      {children}
    </Link>
  )
};

export const BrandIcon = ({ size = 36, alt = "HeuteApp Logo", ...props }: BrandIconProps) => {
  return  (
    <img
      {...props}
      src="/assets/favicon.svg"
      alt={alt}
      width={size}
      height={size}
    />
  )
};

export const BrandText = ({ text, color = "#eaeaea", size = "1.25rem", ...props }: BrandTextProps) => {
  return (
    <div style={{ 
      ...props,
      color, 
      fontWeight: "600",
      fontSize: size, 
    }}>
      {text}
    </div>
  );
};