import style from "@/src/modules/ux-board/styles/board.module.scss"

import { boardView } from "../utils/view.utils";
import { BoardCardItemView } from "./BoardCardItemView";

//

export const BoardCardContainerView = boardView<"card-container">(({ ref, use, state, impl }) => {
    return (
        <div
            ref={ref}
            className={impl.className(style["card-container"])}
        > 
            {impl.content(() => (
                state.items.map((item, i) => (
                    <BoardCardItemView { ...
                        impl.pass<"card-item">({ state: item })
                    }/>
                ))
            ))}
        </div>
    )
});