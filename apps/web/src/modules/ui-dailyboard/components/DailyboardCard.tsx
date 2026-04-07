import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.css"

import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext"
import { DailyboardCardProps } from "@/src/modules/ui-dailyboard/types/dailyboard.props";
import { useLayoutEffect, useRef } from "react";

function DailyboardCard(props : DailyboardCardProps) {
    const { data } = props;
    const { registry} = useDailyboardContext();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registry.registerDailyboardCard(data.id, ref, props)

        return () => {
            registry.unregisterDailyboardCard(data.id)
        }
    }, [registry]) 

    return (
        <div 
            data-dailyboard-card-id={data.id}
            className={style.card}
            ref={ref}
        >
        </div>
    )
}

export default DailyboardCard