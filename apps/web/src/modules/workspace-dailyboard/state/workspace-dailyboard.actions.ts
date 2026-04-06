import { responseToDailyboard } from "@/src/api/responses/dailyboard.response";
import { createAssign } from "../../auth/utils/create-assign";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { responseToLayout } from "@/src/api/responses/layout.response";
import { useDailyboardStore } from "@/src/heute-store/stores/dailyboard.store";
import { useLayoutDataStore } from "@/src/heute-store/stores/layout.stores";
import { parseYYMMDD } from "../../shared/utils/date.utils";

export const saveSourcesAction = ({event} : { event: WorkspaceDailyboardMachineEvent }) => {
    if(event.type === "xstate.done.actor.fetch-sources") {
        const output = event.output;

        const { loadMeDailyboard } = useDailyboardStore.getState();
        const { loadMeLayout } = useLayoutDataStore.getState();

        loadMeDailyboard(output.categoryPath, responseToDailyboard(output));
        loadMeLayout(responseToLayout(output.layout));
    }
};

export const setSourcesAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type === "xstate.done.actor.fetch-sources") {
            const output = event.output;

            const { getMeDailyboard } = useDailyboardStore.getState();
            const { getMeLayout } = useLayoutDataStore.getState();

            return {
                dailyboardData: getMeDailyboard(output.categoryPath, parseYYMMDD(output.date)!) ?? null,
                layoutData: getMeLayout(output.layout.name, output.layout.version) ?? null,
                layoutStyle: null
            };
        }

        return {};
    }
);