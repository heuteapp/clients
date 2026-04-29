import clsx from "clsx";
import { Box } from "@mui/material";
import { BoardCardItemViewProps } from "../types/props.types";
import { VIEW, VIEWCONTENT } from "../../t-core/utils/view.utils";
import { boardView } from "../utils/view.utils";

export const BoardCardItemView = (props : BoardCardItemViewProps) => (
    VIEW(boardView("board-card-item"), props)
    .RENDER(({ ref, state, slot }) => (
        <Box
            className={clsx('heute-card', ...(slot["&"]?.className || []))}
            sx={{
                width: (state.data.placement?.position.colSpan || 0) * (state.cellStep || 0),
                height: (state.data.placement?.position.rowSpan || 0) * (state.cellStep || 0),
                ...(slot["&"]?.sx || {}),
            }}
            ref={ref}
        >
            {state.isFrontFace != false ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(slot.title?.className || []))}
                        sx={{
                            height: state.cellStep ? (1 * (state.cellStep || 0)): "auto",
                            ...slot.title?.sx,
                        }}
                    >
                        {VIEWCONTENT(state, null, slot.title?.wrapper)}
                    </Box>
                    <Box
                        data-front-face
                        className={clsx('face', ...(slot.frontFace?.className || []))}
                        sx={{...slot.frontFace?.sx}}
                    >
                        {VIEWCONTENT(state, null, slot.frontFace?.wrapper)}
                    </Box>
                </>
            ) : (
                <Box
                    data-back-face
                    className={clsx('face', ...(slot.backFace?.className || []))}
                    sx={{...slot.backFace?.sx}}
                >
                    {VIEWCONTENT(state, null, slot.backFace?.wrapper)}
                </Box>
            )}
        </Box>
    ))
)