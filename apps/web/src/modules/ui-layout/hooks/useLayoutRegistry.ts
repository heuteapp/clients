import React from "react"
import { LayoutRegistry } from "@/src/modules/ui-layout/types/layout.registry";
import { createLayoutRegistry } from "@/src/modules/ui-layout/registries/layout.registry";

export const useLayoutRegistry = (layoutRef: React.RefObject<HTMLDivElement | null>) : LayoutRegistry => {
    return React.useRef<LayoutRegistry>(createLayoutRegistry(layoutRef)).current;
}