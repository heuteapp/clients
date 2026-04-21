import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.scss"

import { useLayoutEffect, useRef } from "react";
import DailyboardCard from "./DailyboardCard"

import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext"
import { DailyboardCardContainerProps } from "@/src/modules/ui-dailyboard/types/dailyboard.props";
import { getDailyboardCardContainerDataSet } from "../utils/ui.utils";

//

function DailyboardCardContainer(props : DailyboardCardContainerProps) {
    const { registry } = useDailyboardContext();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registry.registerDailyboardCardContainer(ref, props)

        return () => {
          registry.unregisterDailyboardCardContainer()
        }
    }, [registry])

    return (
        <div 
            className={style.cardContainer} 
            ref={ref}
            {...getDailyboardCardContainerDataSet()}
        >
            {props.cards.map(card => (
                <DailyboardCard key={card.id} data={card} />
            ))}
        </div>
    )
}

export default DailyboardCardContainer