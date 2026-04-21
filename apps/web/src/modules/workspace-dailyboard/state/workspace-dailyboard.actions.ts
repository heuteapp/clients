import { responseToDailyboard } from "@/src/api/responses/dailyboard.response";
import { createAssign } from "../../auth/utils/create-assign";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { responseToLayout } from "@/src/api/responses/layout.response";
import { useDailyboardDataStore } from "@/src/heute-store/stores/dailyboard.store";
import { useLayoutDataStore } from "@/src/heute-store/stores/layout.stores";
import { isoToYYMMDD } from "../../shared/utils/date.utils";

export const fetchingSourcesDoneAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type !== "xstate.done.actor.fetch-sources") {
            throw new Error("fetchingSourcesDoneAction can only be used with fetchSources actor success events");
        }

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
);

export const fetchingSourcesErrorAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type !== "xstate.error.actor.fetch-sources") {
            throw new Error("fetchingSourcesErrorAction can only be used with fetchSources actor errors");
        }

        return {
            dailyboardData: null,
            layoutData: null,
            layoutStyle: null
        }
    }
);

//

export const cardCreatingCancelAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type !== "CARD_CREATE_CANCEL") {
            throw new Error("cardCreatingCancelAction can only be used with CARD_CREATE_CANCEL events");
        }

        return {
            draftCard: null
        }
    }
);

export const cardCreatingPlacingRequestAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type !== "CARD_CREATE_PLACE_REQUEST") {
            throw new Error("cardCreatingPlacingRequestAction can only be used with CARD_CREATE_PLACE_REQUEST events");
        }

        return {
            draftCard: {
                size: event.input.size,
                content: event.input.content
            }
        }
    }
);

export const cardCreatingPlaceDoneAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event, context }) => {
        if(event.type !== "CARD_CREATE_PLACE_DONE") {
            throw new Error("cardCreatingPlaceDoneAction can only be used with CARD_CREATE_PLACE_DONE events");
        }

        const payload = event.payload;

        const { addCard } = useDailyboardDataStore.getState();

        addCard(payload.categoryPath, payload.date, {
            name: crypto.randomUUID(),
            material: context.draftCard!.content,
            placement: payload.placement
        });

        return {
            draftCard: null
        }
    }
);