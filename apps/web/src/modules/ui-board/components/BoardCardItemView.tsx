import clsx from "clsx";
import { Box } from "@mui/material";
import { BoardCardItemViewProps } from "../types/props.types";

export function BoardCardItemView({ state, ref, port, slot }: BoardCardItemViewProps) {
    return (
        <Box
            className={clsx('heute-card', ...(port.className?.["&"] || []))}
            sx={{
                width: (state.cardSpan?.colSpan || 0) * (state.cellStep || 0),
                height: (state.cardSpan?.rowSpan || 0) * (state.cellStep || 0),
                ...(slot?.sx || port.sx?.["&"]),
            }}
            ref={ref}
        >
            {state.isFrontFace ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(port.className?.title || []))}
                        sx={{
                            height: 1 * (state.cellStep || 0),
                            ...port.sx?.title,
                        }}
                    >
                        {port.render?.title ? port.render.title(state) : state.content.title}
                    </Box>
                    <Box
                        data-front-face
                        className={clsx('face', ...(port.className?.frontFace || []))}
                        sx={{...port.sx?.frontFace}}
                    >
                        {port.render?.frontFace ? port.render.frontFace(state) : null}
                    </Box>
                </>
            ) : (
                <Box
                    data-back-face
                    className={clsx('face', ...(port.className?.backFace || []))}
                    sx={{...port.sx?.backFace}}
                >
                    {port.render?.backFace ? port.render.backFace(state) : null}
                </Box>
            )}
        </Box>
    )
}