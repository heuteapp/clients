import { BoardThemeActions, BoardThemeValue } from "@/src/core/types/domain/board/board.theme";

export type BoardThemeManager = React.RefObject<BoardThemeValue & BoardThemeActions | null>