import { Favicon } from "@/src/ui/assets/Favicon";
import Link from "next/link";
import { ReactNode } from "react";

const baseStyles = {
  display: "flex",
  alignItems: "center",
  fontSize: "1.5rem",
  color: "#FFF",
  textDecoration: "none",
  userSelect: "none",
} as const;

export const Brand = ({ children }: { children: ReactNode }) => {
  return (
    <Link href="/" style={baseStyles}>
      {children}
    </Link>
  );
};

interface BrandBaseProps {
  style?: React.CSSProperties;
}

//

interface BrandIconProps extends BrandBaseProps {
  width?: number;
  height?: number;
  alt?: string;
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

//

interface BrandFullProps extends BrandBaseProps {
  iconWidth?: number;
  iconHeight?: number;
  iconAlt?: string;
  iconStyle?: React.CSSProperties;
  textChildren?: ReactNode;
  textStyle?: React.CSSProperties;
};

Brand.Full = ({ iconWidth = 36, iconHeight = 36, iconAlt = "HeuteApp Logo", iconStyle, textChildren = "HeuteApp", textStyle }: BrandFullProps) => {
  return (
    <Brand>
      <Brand.Icon width={iconWidth} height={iconHeight} alt={iconAlt} style={iconStyle} />
      <Brand.Text style={textStyle}>
        {textChildren}
      </Brand.Text>
    </Brand>
  );
};



Brand.Compact = ({ iconWidth = 36, iconHeight = 36, iconAlt = "HeuteApp Logo", iconStyle, textChildren = "HeuteApp", textStyle }: BrandFullProps) => {
  return (
    <Brand>
      <Brand.Icon width={iconWidth} height={iconHeight} alt={iconAlt} style={iconStyle} />
      <Brand.Text style={textStyle}>
        {textChildren}
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