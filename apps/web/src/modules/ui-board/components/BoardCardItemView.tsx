import clsx from "clsx";
import { Box } from "@mui/material";
import { BoardCardItemViewProps } from "../types/props.types";
import { BoardViewSchema } from "../types/view.types";
import { VIEW } from "../../ui-base/utils/view.utils";

export const BoardCardItemView = (props : BoardCardItemViewProps) => (
    VIEW({ schema: {} as BoardViewSchema, id: "board-card-item" })
    .RENDER(props, ({ ref, state, x, y }) => (
        <Box
            className={clsx('heute-card', ...(x.className?.["&"] || []))}
            sx={{
                width: (state.cardSpan?.colSpan || 0) * (state.cellStep || 0),
                height: (state.cardSpan?.rowSpan || 0) * (state.cellStep || 0),
                ...(x?.sx || x.sx?.["&"]),
            }}
            ref={ref}
        >
            {state.isFrontFace ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(x.className?.title || []))}
                        sx={{
                            height: 1 * (state.cellStep || 0),
                            ...x.sx?.title,
                        }}
                    >
                        {x.render?.title ? x.render.title(state) : state.content.title}
                    </Box>
                    <Box
                        data-front-face
                        className={clsx('face', ...(x.className?.frontFace || []))}
                        sx={{...x.sx?.frontFace}}
                    >
                        {x.render?.frontFace ? x.render.frontFace(state) : null}
                    </Box>
                </>
            ) : (
                <Box
                    data-back-face
                    className={clsx('face', ...(x.className?.backFace || []))}
                    sx={{...x.sx?.backFace}}
                >
                    {x.render?.backFace ? x.render.backFace(state) : null}
                </Box>
            )}
        </Box>
    ))
)