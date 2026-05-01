import style from "@/src/modules/ux-board/styles/board.module.scss"

import { boardView } from "../utils/view.utils";
import { BoardCardItemView } from "./BoardCardItemView";

//

export const BoardCardContainerView = boardView<"card-container">(({ ref, state, impl }) => {
    return (
        <div
            ref={ref}
            className={impl.className(style["card-container"])}
        > 
            {impl.render(() => (
                state.items.map((item, i) => (
                    <BoardCardItemView 
                        key={i}
                        state={item}
                    />
                ))
            ))}
        </div>
    )
});