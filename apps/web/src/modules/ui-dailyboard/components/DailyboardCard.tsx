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
            data-dailyboard-card-type={"content"}
            data-dailyboard-card-id={dailyboardCardData.id}
            data-dailyboard-card-key={dailyboardCardData.name}
            data-dailyboard-card-title={dailyboardCardContent.title}
            data-dailyboard-card-section-name={placement.sectionName}
            data-dailyboard-card-col-index={placement.position.colIndex}
            data-dailyboard-card-row-index={placement.position.rowIndex}
            data-dailyboard-card-col-span={placement.position.colSpan}
            data-dailyboard-card-row-span={placement.position.rowSpan}
            className={clsx(style.card, cardColor)}
            ref={ref}
        >
            <div
                data-dailyboard-card-header
                className={'header'}
            >
                {dailyboardCardContent.title}
            </div>
            <div
                className={'body'}
            >
            <div className={clsx('colorButtons', style.colorButtons)}>
                <button className={'colorBtn'} data-color="none" onClick={(e) => handleColorChange(e, '')} style={{background: '#3f3f3f' }}></button>
                <button className={'colorBtn'} data-color="red" onClick={(e) => handleColorChange(e, 'red')} style={{background: '#d44'}}></button>
                <button className={'colorBtn'} data-color="orange" onClick={(e) => handleColorChange(e, 'orange')} style={{background: '#e87c30'}}></button>
                <button className={'colorBtn'} data-color="yellow" onClick={(e) => handleColorChange(e, 'yellow')} style={{background: '#e8c83c'}}></button>
                <button className={'colorBtn'} data-color="green" onClick={(e) => handleColorChange(e, 'green')} style={{background: '#4aa84c'}}></button>
                <button className={'colorBtn'} data-color="blue" onClick={(e) => handleColorChange(e, 'blue')} style={{background: '#4a7ac8'}}></button>
                <button className={'colorBtn'} data-color="pink" onClick={(e) => handleColorChange(e, 'pink')} style={{background: '#d46a8c'}}></button>
                <button className={'colorBtn'} data-color="purple" onClick={(e) => handleColorChange(e, 'purple')} style={{background: '#8c4ac8'}}></button>
            </div>

            </div>
        </div>
    )
}

export default DailyboardCard