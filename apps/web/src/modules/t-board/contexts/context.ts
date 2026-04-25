import React from "react";
import { CardInteractionContextValue } from "../types/context.types";

export const CardInteractionContext = React.createContext<CardInteractionContextValue | null>(null);