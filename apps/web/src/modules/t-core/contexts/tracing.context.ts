import React from "react";
import { TracingDomainContextValue, TracingStoreContextValue } from "../types/context.types";

export const TracingStoreContext = React.createContext<TracingStoreContextValue | null>(null);

export const TracingDomainContext = React.createContext<TracingDomainContextValue | null>(null);