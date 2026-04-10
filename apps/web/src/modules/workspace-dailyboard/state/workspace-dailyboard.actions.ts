import { responseToDailyboard } from "@/src/api/responses/dailyboard.response";
import { createAssign } from "../../auth/utils/create-assign";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { responseToLayout } from "@/src/api/responses/layout.response";
import { useDailyboardDataStore } from "@/src/heute-store/stores/dailyboard.store";
import { useLayoutDataStore } from "@/src/heute-store/stores/layout.stores";
import { isoToYYMMDD } from "../../shared/utils/date.utils";
import { DailyboardCardData } from "../../dailyboard/types/dailyboard.data.types";

export const resolveSourcesAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type === "xstate.done.actor.fetch-sources") {
            const output = event.output;

            const { getMeDailyboard } = useDailyboardDataStore.getState();

            let dailyboardData = getMeDailyboard(output.categoryPath, isoToYYMMDD(output.date)!) ?? null;

            if(!dailyboardData) {
                const { loadMeDailyboard } = useDailyboardDataStore.getState();
                loadMeDailyboard(responseToDailyboard(output));

                dailyboardData = getMeDailyboard(output.categoryPath, isoToYYMMDD(output.date)!) ?? null;
            }

            const { getGlobalLayout } = useLayoutDataStore.getState();
            let layoutData = getGlobalLayout(output.layout.name, output.layout.version) ?? null;

            if(!layoutData) {
                const { loadGlobalLayout } = useLayoutDataStore.getState();
                loadGlobalLayout(responseToLayout(output.layout));

                layoutData = getGlobalLayout(output.layout.name, output.layout.version) ?? null;
            }

            return {
                dailyboardData,
                layoutData,
                layoutStyle: null
            };
        }

        return {};
    }
);

export const setCardCreateSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_CREATE_REQUESTED") {
            context.sessions.cardCreate = {
                size: event.cardSize
            }
        }

        return context;
    }
);

export const unsetCardCreateSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_CREATE_SUCCEEDED" || event.type === "CARD_CREATE_CANCELLED") {
            context.sessions.cardCreate = null;
        }

        return context;
    }
);

export const setCardEditSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_EDIT_REQUESTED") {
            context.sessions.cardEdit = {
                cardKey: event.cardKey
            }
        }

        return context;
    }
);

export const unsetCardEditSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_EDIT_CONFIRMED" || event.type === "CARD_EDIT_CANCELLED") {
            context.sessions.cardEdit = null;
        }

        return context;
    }
);

//

export const createCardAction = ({ event } : { event: WorkspaceDailyboardMachineEvent } ) => {
    if(event.type !== "CARD_CREATE_SUCCEEDED") return;

    const { addCard } = useDailyboardDataStore.getState();

    const dailyboardCard : DailyboardCardData = {
        name: crypto.randomUUID(),
        material: {
            title: null
        },
        placement: event.placement
    }

    addCard(event.categoryPath, event.date, dailyboardCard);
}