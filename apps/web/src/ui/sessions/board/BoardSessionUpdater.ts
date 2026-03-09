import { Draft } from "immer";
import { BoardSession } from "./BoardSession";

export type BoardSessionUpdater = (updater: (draft: Draft<BoardSession>) => void) => void;