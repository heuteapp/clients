import React from "react";
import { TracingContextValue } from "../types/context.types";

export const TracingContext = React.createContext<TracingContextValue | null>(null);