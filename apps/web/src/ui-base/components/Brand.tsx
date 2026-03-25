import { CSSProperties } from "react";
import { BrandIconProps, BrandRootProps, BrandTextProps } from "../types/ui.props.types";
import { Link } from "./Link";


export const BrandRoot = ({ children, link }: BrandRootProps) => {
  const styles : CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    color: "#FFF",
    textDecoration: "none",
    userSelect: "none",
  };

  return (
    <Link href={link?.href} linkType={link?.linkType} style={{...styles, ...link?.style}}>
      {children}
    </Link>
  )
};

export const BrandIcon = ({ size = 36, alt = "HeuteApp Logo", style }: BrandIconProps) => {
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

export const BrandText = ({ text, color = "#eaeaea", size = "1.25rem", style }: BrandTextProps) => {
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