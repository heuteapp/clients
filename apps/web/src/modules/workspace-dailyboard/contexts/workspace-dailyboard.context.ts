"use client";

import { createContext } from "react";
import { WorkspaceDailyboardContextValue } from "../types/workspace-dailyboard.context.types";

export const WorkspaceDailyboardContext = createContext<WorkspaceDailyboardContextValue | null>(null);