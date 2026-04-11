import { DailyboardRoot } from "../../ui-dailyboard/components/DailyboardRoot";
import { WorkspaceDailyboardProps } from "../types/workspace-dailyboard.props";

export function WorkspaceDailyboardView({ data }: WorkspaceDailyboardProps) {
    const padding = "72px 36px";

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding,
                boxSizing: "border-box",
                background: "#0f1115",
                display: "flex",
            }}
        >
            <DailyboardRoot data={data} />
        </div>
    );
}