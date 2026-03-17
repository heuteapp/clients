export const Logo = ({ width = 100, height = 100, alt = "HeuteApp Logo", className = "" }) => {
  return (
    <img
      src="/assets/logo.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};