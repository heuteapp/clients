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

export const setCardCreationSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_CREATE_REQUESTED") {
            context.sessions.cardCreation = {
                size: event.cardSize
            }
        }

        return context;
    }
);

export const unsetCardCreationSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_CREATE_SUCCEEDED" || event.type === "CARD_CREATE_CANCELLED") {
            context.sessions.cardCreation = null;
        }

        return context;
    }
);

export const setCardEditingSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_EDIT_REQUESTED") {
            context.sessions.cardEditing = {
                categoryPath: event.categoryPath,
                date: event.date,
                cardKey: event.cardKey,
            }
        }

        return context;
    }
);

export const unsetCardEditingSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_EDIT_CONFIRMED" || event.type === "CARD_EDIT_CANCELLED") {
            context.sessions.cardEditing = null;
        }

        return context;
    }
);

export const setCardPlacingSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_PLACE_REQUESTED") {
            context.sessions.cardPlacing = {
                categoryPath: event.categoryPath,
                date: event.date,
                cardKey: event.cardKey
            }
        }

        return context;
    }
);

export const unsetCardPlacingSessionAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ context, event }) => {
        if(event.type === "CARD_PLACE_CONFIRMED" || event.type === "CARD_PLACE_CANCELLED") {
            context.sessions.cardPlacing = null;
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

export const moveCardAction = ({ context, event } : { context: WorkspaceDailyboardMachineContext, event: WorkspaceDailyboardMachineEvent } ) => {
    if(event.type !== "CARD_PLACE_REPOSITION_COMPLETED") return;
    
    const { categoryPath, date, cardKey } = context.sessions.cardPlacing!;

    const { updateCard } = useDailyboardDataStore.getState();
    
    updateCard(categoryPath, date, cardKey, (draft) => {
        draft.placement = event.placement;
    });
}