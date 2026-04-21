import clsx from "clsx";
import { DailyboardCardRootProps } from "../types/dailyboard.props";
import { getDailyboardCardDataSet } from "../utils/ui.utils";

export function DailyboardCardRoot({ ref, className, data }: DailyboardCardRootProps) {
    return (
        <div
            className={clsx('heute-card', ...(className || []))}
            ref={ref}
            {...getDailyboardCardDataSet(data)}
        >
            <div
                data-title
                className={'title'}
            >
                
            </div>
            <div
                data-front-face
                className={'face'}
            >
            </div>
        </div>
    )
}