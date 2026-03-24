import { Brand } from "./app/Brand";

export const StickyNavbar = () => {
  return (
    <nav style={{
        borderBottom: "1px solid #eaeaea",
        width: "100%",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFF",
        fontSize: "1.5rem",
    }}>
      <Brand.Compact />
    </nav>
  );
};