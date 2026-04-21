import clsx from "clsx";
import { DailyboardCardRootProps } from "../types/dailyboard.props";
import { getDailyboardCardDataSet } from "../utils/ui.utils";

export function DailyboardCardRoot({ data, ref, className, render }: DailyboardCardRootProps) {
    return (
        <div
            className={clsx('heute-card', ...(className?.body || []))}
            ref={ref}
            {...getDailyboardCardDataSet(data)}
        >
            <div
                data-title
                className={clsx('title', ...(className?.title || []))}
            >
                {render?.title ? render.title(data) : null}
            </div>
            <div
                data-front-face
                className={clsx('face', ...(className?.frontFace || []))}
            >
                {render?.frontFace ? render.frontFace(data) : null}
            </div>
        </div>
    )
}