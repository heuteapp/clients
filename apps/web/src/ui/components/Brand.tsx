import { Favicon } from "@/src/ui/assets/Favicon";
import Link from "next/link";

export const Brand = () => {
  return (
    <Link href="/" style={{ 
      display: "flex", 
      alignItems: "center", 
      fontSize: "1.5rem",
      color: "#FFF",
      textDecoration: "none", 
    }}>
      <Favicon width={36} height={36} alt="HeuteApp Logo"/>
      euteApp
    </Link>
  );
};