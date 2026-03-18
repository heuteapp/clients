export const Favicon = ({ width = 100, height = 100, alt = "HeuteApp Favicon", className = "" }) => {
  return (
    <img
      src="/assets/favicon.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};