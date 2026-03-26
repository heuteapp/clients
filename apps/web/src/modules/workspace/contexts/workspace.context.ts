"use client";

import { createContext } from "react";
import { WorkspaceContextValue } from "../types/workspace.context.types";

export const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);