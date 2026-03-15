import { LayoutStyle, LayoutSectionStyle } from "@/src/core/types/domain/layout/layout.style";
import { BoardStyle, BoardCardStyle } from "@/src/core/types/domain/board/board.style";

export interface BoardThemeValue {
    board: BoardStyle | null;
    cards: BoardCardStyle[];
    layout: LayoutStyle | null;
    sections: LayoutSectionStyle[];
}