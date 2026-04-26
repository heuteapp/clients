import clsx from "clsx";
import { Box } from "@mui/material";
import { BoardCardItemViewProps } from "../types/props.types";

export function BoardCardItemView({ state, ref, className, sx, render, slot }: BoardCardItemViewProps) {
    const viewKey = "board-card-item";
    const viewClassName = className?.[viewKey];
    const viewSx = sx?.[viewKey];
    const viewRender = render?.[viewKey];

    return (
        <Box
            className={clsx('heute-card', ...(viewClassName?.body || []))}
            sx={{
                width: (state.cardSpan?.colSpan || 0) * (state.cellStep || 0),
                height: (state.cardSpan?.rowSpan || 0) * (state.cellStep || 0),
                ...(slot?.sx || viewSx?.body),
            }}
            ref={ref}
        >
            {state.isFrontFace ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(viewClassName?.title || []))}
                        sx={{
                            height: 1 * (state.cellStep || 0),
                            ...viewSx?.title,
                        }}
                    >
                        {viewRender?.title ? viewRender.title(state) : state.content.title}
                    </Box>
                    <Box
                        data-front-face
                        className={clsx('face', ...(viewClassName?.frontFace || []))}
                        sx={{...viewSx?.frontFace}}
                    >
                        {viewRender?.frontFace ? viewRender.frontFace(state) : null}
                    </Box>
                </>
            ) : (
                <Box
                    data-back-face
                    className={clsx('face', ...(viewClassName?.backFace || []))}
                    sx={{...viewSx?.backFace}}
                >
                    {viewRender?.backFace ? viewRender.backFace(state) : null}
                </Box>
            )}
        </Box>
    )
}