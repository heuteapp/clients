import { DailyboardRoot } from "../../ui-dailyboard/components/DailyboardRoot";
import { WorkspaceDailyboardProps } from "../types/workspace-dailyboard.props";

export function WorkspaceDailyboardView({ data } : WorkspaceDailyboardProps) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "1%",
                boxSizing: "border-box",
            }}
        >
            <DailyboardRoot data={data} />
        </div>
    );
}