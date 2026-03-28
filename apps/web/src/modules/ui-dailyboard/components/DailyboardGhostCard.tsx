import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.css"

function DailyboardGhostCard() {
    return (
        <div 
            className={style.ghostCard} 
            style={{
                visibility: "var(--ghost-card-visible)" as any,
                left: "var(--ghost-card-x)",
                top: "var(--ghost-card-y)",
                width: `var(--ghost-card-width)`,
                height: `var(--ghost-card-height)`
            }}
        >
        </div>
    )
}

export default DailyboardGhostCard