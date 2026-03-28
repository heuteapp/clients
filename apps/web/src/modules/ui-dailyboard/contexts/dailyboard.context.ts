import { createContext } from "react";
import { DailyboardContextValue } from "@/src/modules/ui-dailyboard/types/dailyboard.context";

export const DailyboardContext = createContext<DailyboardContextValue | null>(null);