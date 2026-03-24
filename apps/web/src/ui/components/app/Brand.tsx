import { BrandIconProps, BrandBaseProps, BrandFullProps } from "@/src/types/ui/components/app/Brand";
import { Favicon } from "@/src/ui/assets/Favicon";
import Link from "next/link";
import { ReactNode } from "react";

export const Brand = ({ children }: { children: ReactNode }) => {
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

Brand.Icon = ({ width = 36, height = 36, alt = "HeuteApp Logo" }: BrandIconProps) => {
  return <Favicon width={width} height={height} alt={alt} />;
};

interface BrandTextProps extends BrandBaseProps {
  children: ReactNode;
};

Brand.Text = ({ children, style }: BrandTextProps) => {
  return (
    <div style={{ paddingTop: 6, ...style }}>
      {children}
    </div>
  );
};

Brand.Full = ({ iconWidth = 36, iconHeight = 36, iconAlt = "HeuteApp Logo", iconStyle, text = "HeuteApp", textStyle }: BrandFullProps) => {
  return (
    <Brand>
      <Brand.Icon width={iconWidth} height={iconHeight} alt={iconAlt} style={iconStyle} />
      <Brand.Text style={textStyle}>
        {text}
      </Brand.Text>
    </Brand>
  );
};

Brand.Compact = ({ iconWidth = 36, iconHeight = 36, iconAlt = "HeuteApp Logo", iconStyle, text = "HeuteApp", textStyle }: BrandFullProps) => {
  return (
    <Brand>
      <Brand.Icon width={iconWidth} height={iconHeight} alt={iconAlt} style={iconStyle} />
      <Brand.Text style={textStyle}>
        {text}
      </Brand.Text>
    </Brand>
  );
};

Brand.IconOnly = ({ width = 36, height = 36, alt = "HeuteApp Logo" }: BrandIconProps) => {
  return (
    <Brand>
      <Brand.Icon width={width} height={height} alt={alt} />
    </Brand>
  );
};

Brand.TextOnly = ({ children = "HeuteApp" } : BrandTextProps ) => {
  return (
    <Brand>
      <Brand.Text>{children}</Brand.Text>
    </Brand>
  );
};