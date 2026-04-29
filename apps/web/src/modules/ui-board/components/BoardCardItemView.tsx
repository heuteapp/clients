import clsx from "clsx";
import { Box } from "@mui/material";
import { BoardCardItemViewProps } from "../types/props.types";
import { VIEW, VIEWCONTENT } from "../../t-core/utils/view.utils";
import { boardView } from "../utils/view.utils";

export const BoardCardItemView = (props : BoardCardItemViewProps) => (
    VIEW(boardView("board-card-item"), props)
    .RENDER(({ context, ref, state, slot }) => (
        <Box
            className={clsx('heute-card', ...(slot["&"]?.className || []))}
            sx={{
                width: (state.position.colSpan || 0) * (context.cellStep || 0),
                height: (state.position.rowSpan || 0) * (context.cellStep || 0),
                ...(slot["&"]?.sx || {}),
            }}
            ref={ref}
        >
            {context.isFrontFace != false ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(slot.title?.className || []))}
                        sx={{
                            height: context.cellStep ? (1 * (context.cellStep || 0)): "auto",
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