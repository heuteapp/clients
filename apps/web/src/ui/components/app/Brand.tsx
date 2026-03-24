import { BrandIconProps, BrandBaseProps, BrandTextOnlyProps, BrandIconOnlyProps, BrandCompactProps, BrandFullProps } from "@/src/types/ui/components/app/Brand";
import { Favicon } from "@/src/ui/assets/Favicon";
import Link from "next/link";
import { ReactNode } from "react";

interface BrandProps {
  children: ReactNode;
}

const BrandRoot = ({ children }: BrandProps) => {
  return (
    <Link href="/" style={{
      display: "flex",
      alignItems: "center",
      fontSize: "1.5rem",
      color: "#FFF",
      textDecoration: "none",
      userSelect: "none",
    }}>
      {children}
    </Link>
  );
};

const BrandIcon = ({ width = 36, height = 36, alt = "HeuteApp Logo", style }: BrandIconProps) => {
  return <Favicon width={width} height={height} alt={alt} style={style} />;
};

interface BrandTextProps extends BrandBaseProps {
  children: ReactNode;
}

const BrandText = ({ children, style }: BrandTextProps) => {
  return (
    <div style={{ paddingTop: 6, ...style }}>
      {children}
    </div>
  );
};

//

export const BrandFull = ({ iconWidth = 36, iconHeight = 36, iconAlt = "HeuteApp Logo", iconStyle, text = "HeuteApp", textStyle }: BrandFullProps) => {
  return (
    <BrandRoot>
      <BrandIcon width={iconWidth} height={iconHeight} alt={iconAlt} style={iconStyle} />
      <BrandText style={textStyle}>
        {text}
      </BrandText>
    </BrandRoot>
  );
};

export const BrandCompact = ({ iconWidth = 36, iconHeight = 36, iconAlt = "HeuteApp Logo", iconStyle, text = "euteApp", textStyle }: BrandCompactProps) => {
  return (
    <BrandRoot>
      <BrandIcon width={iconWidth} height={iconHeight} alt={iconAlt} style={iconStyle} />
      <BrandText style={textStyle}>
        {text}
      </BrandText>
    </BrandRoot>
  );
};

export const BrandIconOnly = ({ width = 36, height = 36, alt = "HeuteApp Logo", style }: BrandIconOnlyProps) => {
  return (
    <BrandRoot>
      <BrandIcon width={width} height={height} alt={alt} style={style} />
    </BrandRoot>
  );
};

export const BrandTextOnly = ({ text = "HeuteApp", style }: BrandTextOnlyProps) => {
  return (
    <BrandRoot>
      <BrandText style={style}>{text}</BrandText>
    </BrandRoot>
  );
};