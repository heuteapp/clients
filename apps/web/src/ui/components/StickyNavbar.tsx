import { Logo } from "@/src/ui/assets/logo";

export const StickyNavbar = () => {
  return (
    <nav style={{
        borderBottom: "1px solid #eaeaea",
        width: "100%",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <Logo width={72} height={72} alt="HeuteApp Logo"/>
    </nav>
  );
};