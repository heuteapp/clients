import React from "react"
import { LayoutRegistry } from "@/src/modules/ui-layout/types/layout.registry";
import { createLayoutRegistry } from "@/src/modules/ui-layout/registries/layout.registry";

export const useLayoutRegistry = (layoutRef: React.RefObject<HTMLDivElement | null>) : LayoutRegistry => {
    const registry = React.useRef<LayoutRegistry>(null);

    React.useEffect(() => {
        return () => {
            registry.current = createLayoutRegistry(layoutRef);
        }
    }, []);

    return registry.current!;
}