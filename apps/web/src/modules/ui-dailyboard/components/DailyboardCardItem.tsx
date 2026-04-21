import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext"
import { DailyboardCardItemProps } from "@/src/modules/ui-dailyboard/types/dailyboard.props";
import { useLayoutEffect, useRef } from "react";
import { DailyboardCardDisplay } from "./DailyboardCardDisplay";
import { getDailyboardCardDataSet } from "../utils/ui.utils";

function DailyboardCardItem(props : DailyboardCardItemProps) {
    const { data: dailyboardCardData } = props;
    const { registry} = useDailyboardContext();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registry.registerDailyboardCard(dailyboardCardData.id, ref, props)

        return () => {
            registry.unregisterDailyboardCard(dailyboardCardData.id)
        }
    }, [registry, props.data])

    const dailyboardCardContent = dailyboardCardData.content;
    const placement = dailyboardCardData.placement;

    if(!placement) return null;

    return (
        <DailyboardCardDisplay 
            content={dailyboardCardData.content}
            ref={ref}
            isFrontFace={true}
            {...getDailyboardCardDataSet(dailyboardCardData)}
        />
    )
}

export default DailyboardCardItem