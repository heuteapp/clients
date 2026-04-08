import React from "react";
import { MetricsContextValue } from "../types/ui.context.types";

export const MetricsContext = React.createContext<MetricsContextValue | null>(null);