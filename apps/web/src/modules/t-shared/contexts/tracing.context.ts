import React from "react";
import { TracingDomainContextValue } from "../types/context.types";

export const TracingDomainContext = React.createContext<TracingDomainContextValue | null>(null);