import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.css"

import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext"
import { DailyboardCardProps } from "@/src/modules/ui-dailyboard/types/dailyboard.props";
import { useLayoutEffect, useRef } from "react";

function DailyboardCard(props : DailyboardCardProps) {
    const { registry} = useDailyboardContext();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registry.registerDailyboardCard(props.id, ref, props)

        return () => {
            registry.unregisterDailyboardCard(props.id)
        }
    }, [registry]) 

    return (
        <div 
            className={style.card} 
            style={{
                left: "var(--card-left)",
                top: "var(--card-top)",
                width: "var(--card-width)",
                height: "var(--card-height)",
            }}
            ref={ref}
        >
        </div>
    )
}

export default DailyboardCard