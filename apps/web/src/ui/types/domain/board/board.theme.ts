import { BoardThemeActions, BoardThemeValue } from "@/src/types/core/domain/board/board.theme";

export type BoardThemeManager = React.RefObject<BoardThemeValue & BoardThemeActions | null>