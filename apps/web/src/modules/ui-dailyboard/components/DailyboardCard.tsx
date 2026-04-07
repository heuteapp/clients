import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.css"

import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext"
import { DailyboardCardProps } from "@/src/modules/ui-dailyboard/types/dailyboard.props";
import { useLayoutEffect, useRef } from "react";

function DailyboardCard(props : DailyboardCardProps) {
    const { data: dailyboardCardData } = props;
    const { registry} = useDailyboardContext();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registry.registerDailyboardCard(dailyboardCardData.id, ref, props)

        return () => {
            registry.unregisterDailyboardCard(dailyboardCardData.id)
        }
    }, [registry]) 

    const dailyboardCardContent = dailyboardCardData.content;
    const placement = dailyboardCardData.placement?.position;

    const placementAttrs = placement?.colIndex !== undefined ? {
        'data-dailyboard-card-placed': true,
        'data-dailyboard-card-colIndex': placement.colIndex,
        'data-dailyboard-card-rowIndex': placement.rowIndex,
        'data-dailyboard-card-colSpan': placement.colSpan,
        'data-dailyboard-card-rowSpan': placement.rowSpan,
    } : {};

    return (
        <div 
            data-dailyboard-card-id={dailyboardCardData.id}
            data-dailyboard-card-title={dailyboardCardContent.title}
            {...placementAttrs}
            className={style.card}
            ref={ref}
        >
        </div>
    )
}

export default DailyboardCard