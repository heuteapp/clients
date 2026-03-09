import { BoardSession } from "./BoardSession";

export { createBoardSession } from "./createBoardSession";
export type { BoardSession } from "./BoardSession";

export type BoardSessionSetter = (updater: (prev: BoardSession) => BoardSession) => void;