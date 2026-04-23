import { useContext } from "react";
import { TracingStoreContext } from "../contexts/tracing.context";

export const useTracingStore= () => {
    const context = useContext(TracingStoreContext);

    if (!context) {
        throw new Error("useTracingStore must be used within an TracingStoreProvider");
    }

    return context;
};