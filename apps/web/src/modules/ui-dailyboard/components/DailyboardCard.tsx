import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.scss"

import { useDailyboardContext } from "@/src/modules/ui-dailyboard/hooks/useDailyboardContext"
import { DailyboardCardProps } from "@/src/modules/ui-dailyboard/types/dailyboard.props";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

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

    const [cardColor, setCardColor] = useState('');

    const handleColorChange = (e: React.MouseEvent<HTMLButtonElement>, color: string) => {
        if (color === '') {
            setCardColor('');
        }
        else {
            setCardColor('uc-' + color);
        }
    };

    if(!placement) return null;

    return (
        <div 
            data-dailyboard-card
            data-dailyboard-card-id={dailyboardCardData.id}
            data-dailyboard-card-key={dailyboardCardData.name}
            data-dailyboard-card-title={dailyboardCardContent.title}
            data-dailyboard-card-section-name={placement.sectionName}
            data-dailyboard-card-col-index={placement.position.colIndex}
            data-dailyboard-card-row-index={placement.position.rowIndex}
            data-dailyboard-card-col-span={placement.position.colSpan}
            data-dailyboard-card-row-span={placement.position.rowSpan}
            className={clsx('heute-card', style.card, cardColor)}
            ref={ref}
        >
            <div
                data-dailyboard-card-header
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