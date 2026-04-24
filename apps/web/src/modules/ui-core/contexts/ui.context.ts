import React from "react";
import { HammerContextValue, MetricsContextValue } from "../types/ui.context.types";

export const HammerContext = React.createContext<HammerContextValue | null>(null);

export const MetricsContext = React.createContext<MetricsContextValue | null>(null);