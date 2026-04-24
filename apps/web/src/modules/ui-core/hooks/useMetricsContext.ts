import { useContext } from "react";
import { MetricsContext } from "../contexts/ui.context";

export const useMetricsContext = () => {
    const context = useContext(MetricsContext);

    if (!context) {
        throw new Error("useMetricsContext must be used within an MetricsProvider");
    }

    return context;
};