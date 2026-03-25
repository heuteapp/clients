import { createContext } from "react";
import { WorkspaceBoardContextValue } from "../types/workspace-board.context.types";

export const WorkspaceBoardContext = createContext<WorkspaceBoardContextValue | null>(null);