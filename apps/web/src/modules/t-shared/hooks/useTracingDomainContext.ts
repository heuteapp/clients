import { useContext } from "react";
import { TracingDomainContext } from "../contexts/tracing.context";

export const useTracingDomainContext = () => {
    const context = useContext(TracingDomainContext);

    if (!context) {
        throw new Error("useTracingDomainContext must be used within an TracingDomainProvider");
    }

    return context;
};