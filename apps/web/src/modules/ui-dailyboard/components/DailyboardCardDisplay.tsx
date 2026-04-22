import clsx from "clsx";
import { DailyboardCardDisplayProps } from "../types/dailyboard.props";
import { Box } from "@mui/material";

export function DailyboardCardDisplay({ state, ref, className, sx, render }: DailyboardCardDisplayProps) {
    return (
        <Box
            className={clsx('heute-card', ...(className?.body || []))}
            sx={{
                width: (state.colSpan || 0) * (state.cellStep || 0),
                height: (state.rowSpan || 0) * (state.cellStep || 0),
                ...sx?.body,
            }}
            ref={ref}
        >
            {state.isFrontFace ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(className?.title || []))}
                        sx={{
                            height: 1 * (state.cellStep || 0),
                            ...sx?.title,
                        }}
                    >
                        {render?.title ? render.title(state.content) : state.content.title}
                    </Box>
                    <Box
                        data-front-face
                        className={clsx('face', ...(className?.frontFace || []))}
                        sx={{...sx?.frontFace}}
                    >
                        {render?.frontFace ? render.frontFace(state.content) : null}
                    </Box>
                </>
            ) : (
                <Box
                    data-back-face
                    className={clsx('face', ...(className?.backFace || []))}
                    sx={{...sx?.backFace}}
                >
                    {render?.backFace ? render.backFace(state.content) : null}
                </Box>
            )}
        </Box>
    )
}