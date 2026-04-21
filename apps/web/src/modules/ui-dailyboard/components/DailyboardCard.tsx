import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.scss"

import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext"
import { DailyboardCardProps } from "@/src/modules/ui-dailyboard/types/dailyboard.props";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { getDailyboardCardDataSet } from "../utils/ui.utils";

function DailyboardCard(props : DailyboardCardProps) {
    const { data: dailyboardCardData } = props;
    const { registry} = useDailyboardContext();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registry.registerDailyboardCard(dailyboardCardData.id, ref, props)

        return () => {
            registry.unregisterDailyboardCard(dailyboardCardData.id)
        }
    }, [registry, props.data])

    const dailyboardCardContent = dailyboardCardData.material;
    const placement = dailyboardCardData.placement;

    if(!placement) return null;

    return (
        <div
            className={clsx('heute-card')}
            ref={ref}
            {...getDailyboardCardDataSet(dailyboardCardData)}
        >
            <div
                data-header
                className={'title'}
            >
                {dailyboardCardContent.title}
            </div>
            <div
                className={'face'}
            >
            </div>
        </div>
    )
}

export default DailyboardCard