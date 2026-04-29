import clsx from "clsx";
import { Box } from "@mui/material";
import { BoardCardItemViewProps } from "../types/props.types";
import { VIEW, VIEWCONTENT } from "../../t-core/utils/view.utils";
import { boardView } from "../utils/view.utils";

export const BoardCardItemView = (props : BoardCardItemViewProps) => (
    VIEW(boardView("board-card-item"), props)
    .RENDER(({ ref, state, slot }) => (
        <Box
            className={clsx('heute-card', ...(slot.className?.["&"] || []))}
            sx={{
                width: (state.data.placement?.position.colSpan || 0) * (state.cellStep || 0),
                height: (state.data.placement?.position.rowSpan || 0) * (state.cellStep || 0),
                ...(slot.sx?.["&"] || {}),
            }}
            ref={ref}
        >
            {state.isFrontFace != false ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(slot.className?.title || []))}
                        sx={{
                            height: state.cellStep ? (1 * (state.cellStep || 0)): "auto",
                            ...slot.sx?.title,
                        }}
                    >
                        {VIEWCONTENT(state, null, slot.wrapper?.title)}
                    </Box>
                    <Box
                        data-front-face
                        className={clsx('face', ...(slot.className?.frontFace || []))}
                        sx={{...slot.sx?.frontFace}}
                    >
                        {VIEWCONTENT(state, null, slot.wrapper?.frontFace)}
                    </Box>
                </>
            ) : (
                <Box
                    data-back-face
                    className={clsx('face', ...(slot.className?.backFace || []))}
                    sx={{...slot.sx?.backFace}}
                >
                    {VIEWCONTENT(state, null, slot.wrapper?.backFace)}
                </Box>
            )}
        </Box>
    ))
)