import { Favicon } from "@/src/ui/assets/Favicon";

export const Brand = () => {
  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        userSelect: "none",
    }}>
        <Favicon width={36} height={36} alt="HeuteApp Logo"/>
        euteApp
    </div>
  );
};