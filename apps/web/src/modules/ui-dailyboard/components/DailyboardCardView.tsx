import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext"
import { DailyboardCardViewProps } from "@/src/modules/ui-dailyboard/types/dailyboard.props";
import { useLayoutEffect, useRef } from "react";
import { DailyboardCardRoot } from "./DailyboardCardRoot";
import { getDailyboardCardDataSet } from "../utils/ui.utils";

function DailyboardCardView(props : DailyboardCardViewProps) {
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
        <DailyboardCardRoot 
            content={dailyboardCardData.material}
            ref={ref}
            isFrontFace={true}
            {...getDailyboardCardDataSet(dailyboardCardData)}
        />
    )
}

export default DailyboardCardView