import { DailyboardRoot } from "../../ui-dailyboard/components/DailyboardRoot";
import { WorkspaceDailyboardProps } from "../types/workspace-dailyboard.props";

export function WorkspaceDailyboardView({ data }: WorkspaceDailyboardProps) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "2%",
                boxSizing: "border-box",
                background: "#0f1115",
                display: "flex",
            }}
        >
            <DailyboardRoot data={data} />
        </div>
    );
}