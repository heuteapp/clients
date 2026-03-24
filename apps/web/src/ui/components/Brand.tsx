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

//

Brand.Icon = ({ width = 36, height = 36, alt = "HeuteApp Logo" }) => {
  return <Favicon width={width} height={height} alt={alt} />;
};

Brand.Text = ({ children, style }: { children: ReactNode; style?: React.CSSProperties }) => {
  return (
    <div style={{ paddingTop: 6, ...style }}>
      {children}
    </div>
  );
};

//

Brand.Full = ({ iconSize = 36 }) => {
  return (
    <Brand>
      <Brand.Icon width={iconSize} height={iconSize} />
      <Brand.Text>HeuteApp</Brand.Text>
    </Brand>
  );
};

Brand.Compact = ({ iconSize = 36 }) => {
  return (
    <Brand>
      <Brand.Icon width={iconSize} height={iconSize} />
      <Brand.Text>euteApp</Brand.Text>
    </Brand>
  );
};

Brand.IconOnly = ({ size = 36 }) => {
  return (
    <Brand>
      <Brand.Icon width={size} height={size} />
    </Brand>
  );
};

Brand.TextOnly = ({ text = "HeuteApp" }) => {
  return (
    <Brand>
      <Brand.Text>{text}</Brand.Text>
    </Brand>
  );
};