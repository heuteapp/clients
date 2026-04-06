import { responseToDailyboard } from "@/src/api/responses/dailyboard.response";
import { createAssign } from "../../auth/utils/create-assign";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { responseToLayout } from "@/src/api/responses/layout.response";
import { useDailyboardStore } from "@/src/heute-store/stores/dailyboard.store";
import { useLayoutDataStore } from "@/src/heute-store/stores/layout.stores";
import { parseYYMMDD } from "../../shared/utils/date.utils";

export const resolveSourcesAction = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type === "xstate.done.actor.fetch-sources") {
            const output = event.output;

            const { getMeDailyboard } = useDailyboardStore.getState();
            let dailyboardData = getMeDailyboard(output.categoryPath, parseYYMMDD(output.date)!) ?? null;

            if(!dailyboardData) {
                const { loadMeDailyboard } = useDailyboardStore.getState();
                loadMeDailyboard(output.categoryPath, responseToDailyboard(output));

                dailyboardData = getMeDailyboard(output.categoryPath, parseYYMMDD(output.date)!) ?? null;
            }

            const { getMeLayout } = useLayoutDataStore.getState();
            let layoutData = getMeLayout(output.layout.name, output.layout.version) ?? null;

            if(!layoutData) {
                const { loadMeLayout } = useLayoutDataStore.getState();
                loadMeLayout(responseToLayout(output.layout));

                layoutData = getMeLayout(output.layout.name, output.layout.version) ?? null;
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