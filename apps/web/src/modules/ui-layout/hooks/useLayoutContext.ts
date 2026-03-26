import { useContext } from "react";
import { LayoutContext } from "@/src/modules/ui-layout/contexts/layout.context";
import { LayoutContextValue } from "@/src/modules/ui-layout/types/layout.context";

export const useLayoutContext = () : LayoutContextValue => {
    const context = useContext(LayoutContext);
    
    if (!context) {
        throw new Error("useLayoutContext must be used within an LayoutProvider");
    }

    return context;
};