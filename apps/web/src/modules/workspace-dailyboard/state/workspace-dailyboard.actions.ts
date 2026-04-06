import { responseToDailyboard } from "@/src/api/responses/dailyboard.response";
import { createAssign } from "../../auth/utils/create-assign";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { responseToLayout } from "@/src/api/responses/layout.response";
import { useDailyboardStore } from "@/src/heute-store/stores/dailyboard.store";
import { useLayoutDataStore } from "@/src/heute-store/stores/layout.stores";
import { parseYYMMDD } from "../../shared/utils/date.utils";

export const setSources = createAssign<
    WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent
>(
    ({ event }) => {
        if(event.type === "xstate.done.actor.fetch-sources") {
            const output = event.output;

            const { loadMeDailyboard, getMeDailyboard } = useDailyboardStore.getState();
            const { loadMeLayout, getMeLayout } = useLayoutDataStore.getState();

            loadMeDailyboard(output.categoryPath, responseToDailyboard(output));
            loadMeLayout(responseToLayout(output.layout));

            return {
                dailyboardData: getMeDailyboard(output.categoryPath, parseYYMMDD(output.date)!) ?? null,
                layoutData: getMeLayout(output.layout.name, output.layout.version) ?? null,
                layoutStyle: null
            };
        }

        return {};
    }
);