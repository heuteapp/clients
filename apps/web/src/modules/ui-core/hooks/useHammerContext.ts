import { useContext } from "react";
import { HammerContext } from "../contexts/ui.context";

export const useHammerContext = () => {
  const context = useContext(HammerContext);

  if (!context) {
    throw new Error("useHammerContext must be used within an HammerProvider");
  }

  return context;
};