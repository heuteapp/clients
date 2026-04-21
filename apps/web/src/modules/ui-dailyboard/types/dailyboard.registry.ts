import { DailyboardCardContainerNode, DailyboardCardNode, DailyboardRootNode } from "@/src/modules/ui-dailyboard/types/dailyboard.nodes"
import { DailyboardCardContainerProps, DailyboardCardItemProps, DailyboardRootProps } from "@/src/modules/ui-dailyboard/types/dailyboard.props"
import { LayoutRegistry } from "@/src/modules/ui-layout/types/layout.registry"

export interface DailyboardRegistry {
    dailyboard: DailyboardRootNode
    layoutRegistry: LayoutRegistry

    registerDailyboard(
        ref: React.RefObject<HTMLDivElement | null>,
        props: DailyboardRootProps
    ): DailyboardRootNode

    registerDailyboardCardContainer(
        ref: React.RefObject<HTMLDivElement | null>,
        props: DailyboardCardContainerProps  
    ): DailyboardCardContainerNode

    registerDailyboardCard(
        id: string,
        ref: React.RefObject<HTMLDivElement | null>,
        props: DailyboardCardItemProps
    ): DailyboardCardNode

    //

    unregisterDailyboard(): void

    unregisterDailyboardCardContainer(): void

    unregisterDailyboardCard(id: string): void

    //

    getDailyboardCardContainer(): DailyboardCardContainerNode | undefined

    getDailyboardCard(id: string): DailyboardCardNode | undefined

    getDailyboardCards(): DailyboardCardNode[] | undefined

    getDailyboardCardsForSection(sectionId: string): DailyboardCardNode[] | undefined
}