import { useContext } from "react";
import { TracingContext } from "../contexts/tracing.context";

export const useTracingContext = () => {
    const context = useContext(TracingContext);

    if (!context) {
        throw new Error("useTracingContext must be used within an TracingProvider");
    }

    return context;
};