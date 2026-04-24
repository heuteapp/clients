import { responseToDailyboard } from "@/src/api/responses/board.response";
import { createAssign } from "../../d-auth/utils/create-assign";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { responseToCanvas } from "@/src/api/responses/canvas.response";
import { useDailyboardDataStore } from "@/src/heute-store/stores/board.store";
import { useCanvasModelStore } from "@/src/heute-store/stores/canvas.stores";
import { isoToYYMMDD } from "../../d-shared/utils/date.utils";

export const fetchingSourcesDoneAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type !== "xstate.done.actor.fetch-sources") {
            throw new Error("fetchingSourcesDoneAction can only be used with fetchSources actor success events");
        }

        const output = event.output;

        const { getMeDailyboard } = useDailyboardDataStore.getState();

        const key = `${output.categoryPath}@${isoToYYMMDD(output.date)!.raw}`;

        let dailyboardData = getMeDailyboard(key) ?? null;

        if(!dailyboardData) {
            const { loadMeDailyboard } = useDailyboardDataStore.getState();
            loadMeDailyboard(responseToDailyboard(output));

            dailyboardData = getMeDailyboard(key) ?? null;
        }

        const { getGlobalCanvas } = useCanvasModelStore.getState();
        let canvasData = getGlobalCanvas(output.layout.name, output.layout.version) ?? null;

        if(!canvasData) {
            const { loadGlobalCanvas } = useCanvasModelStore.getState();
            loadGlobalCanvas(responseToCanvas(output.layout));

            canvasData = getGlobalCanvas(output.layout.name, output.layout.version) ?? null;
        }

        return {
            dailyboardData,
            canvasData,
            canvasStyle: null
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
            canvasData: null,
            canvasStyle: null
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

        const key = `${payload.categoryPath}@${payload.date!.raw}`;

        addCard(key, {
            name: crypto.randomUUID(),
            content: context.draftCard!.content,
            placement: payload.placement
        });

        return {
            draftCard: null
        }
    }
);

export const cardCreatingPlaceCancelAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type !== "CARD_CREATE_PLACE_CANCEL") {
            throw new Error("cardCreatingPlaceCancelAction can only be used with CARD_CREATE_PLACE_CANCEL events");
        }

        return {}
    }
);