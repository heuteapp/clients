import { HeuteIconProps } from "../types/ui.props";

export const HeuteIcon = ({ alt = "HeuteIcon", width = 96, height = 96, className = "", style } : HeuteIconProps) => {
  return (
    <img
      src="/assets/favicon.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{
        ...style,
      }}
    />
  );
};