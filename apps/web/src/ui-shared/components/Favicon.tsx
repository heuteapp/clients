import { FavIconProps } from "@/src/types/ui/assets/FavIcon";

export const Favicon = ({ alt = "HeuteApp Favicon", width = 100, height = 100, className = "", style } : FavIconProps) => {
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