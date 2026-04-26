import clsx from "clsx";
import { Box } from "@mui/material";
import { BoardCardItemViewProps } from "../types/props.types";
import { BoardViewSchema } from "../types/view.types";
import { VIEW } from "../../ui-base/utils/view.utils";

export const BoardCardItemView = (props : BoardCardItemViewProps) => (
    VIEW({ schema: {} as BoardViewSchema, id: "board-card-item" })
    .RENDER(props, ({ ref, state, slot }) => (
        <Box
            className={clsx('heute-card', ...(slot.className?.["&"] || []))}
            sx={{
                width: (state.cardSpan?.colSpan || 0) * (state.cellStep || 0),
                height: (state.cardSpan?.rowSpan || 0) * (state.cellStep || 0),
                ...(slot.sx || slot.sx?.["&"]),
            }}
            ref={ref}
        >
            {state.isFrontFace ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(slot.className?.title || []))}
                        sx={{
                            height: 1 * (state.cellStep || 0),
                            ...slot.sx?.title,
                        }}
                    >
                        {slot.render?.title ? slot.render.title(state) : state.content.title}
                    </Box>
                    <Box
                        data-front-face
                        className={clsx('face', ...(slot.className?.frontFace || []))}
                        sx={{...slot.sx?.frontFace}}
                    >
                        {slot.render?.frontFace ? slot.render.frontFace(state) : null}
                    </Box>
                </>
            ) : (
                <Box
                    data-back-face
                    className={clsx('face', ...(slot.className?.backFace || []))}
                    sx={{...slot.sx?.backFace}}
                >
                    {slot.render?.backFace ? slot.render.backFace(state) : null}
                </Box>
            )}
        </Box>
    ))
)