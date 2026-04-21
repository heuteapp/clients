import clsx from "clsx";
import { DailyboardCardRootProps } from "../types/dailyboard.props";
import { getDailyboardCardDataSet } from "../utils/ui.utils";
import { Box } from "@mui/material";

export function DailyboardCardRoot({ data, ref, isFrontFace, className, sx, render }: DailyboardCardRootProps) {
    return (
        <Box
            className={clsx('heute-card', ...(className?.body || []))}
            sx={{...sx?.body}}
            ref={ref}
            {...getDailyboardCardDataSet(data)}
        >
            {isFrontFace ? (
                <>
                    <Box
                        data-title
                        className={clsx('title', ...(className?.title || []))}
                        sx={{...sx?.title}}
                    >
                        {render?.title ? render.title(data) : data.material.title}
                    </Box>
                    <Box
                        data-front-face
                        className={clsx('face', ...(className?.frontFace || []))}
                        sx={{...sx?.frontFace}}
                    >
                        {render?.frontFace ? render.frontFace(data) : null}
                    </Box>
                </>
            ) : (
                <>
                    <Box
                        data-back-face
                        className={clsx('face', ...(className?.backFace || []))}
                        sx={{...sx?.backFace}}
                    >
                        {render?.backFace ? render.backFace(data) : null}
                    </Box>
                </>
            )}
        </Box>
    )
}