import clsx from "clsx";
import { DailyboardCardRootProps } from "../types/dailyboard.props";
import { Box } from "@mui/material";

export function DailyboardCardRoot({ content, isFrontFace, ref, className, sx, render }: DailyboardCardRootProps) {
    return (
        <Box
            className={clsx('heute-card', ...(className?.body || []))}
            sx={{...sx?.body}}
            ref={ref}
        >
            {isFrontFace ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(className?.title || []))}
                        sx={{...sx?.title}}
                    >
                        {render?.title ? render.title(content) : content.title}
                    </Box>
                    <Box
                        data-front-face
                        className={clsx('face', ...(className?.frontFace || []))}
                        sx={{...sx?.frontFace}}
                    >
                        {render?.frontFace ? render.frontFace(content) : null}
                    </Box>
                </>
            ) : (
                <>
                    <Box
                        data-back-face
                        className={clsx('face', ...(className?.backFace || []))}
                        sx={{...sx?.backFace}}
                    >
                        {render?.backFace ? render.backFace(content) : null}
                    </Box>
                </>
            )}
        </Box>
    )
}