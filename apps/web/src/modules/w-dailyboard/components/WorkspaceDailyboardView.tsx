import { BoardRoot } from "../../ui-board/components/BoardRoot";
import { WorkspaceDailyboardProps } from "../types/workspace-dailyboard.props";

export function WorkspaceDailyboardView({ data }: WorkspaceDailyboardProps) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "2%",
                boxSizing: "border-box",
                background: "rgba(13, 15, 20, 1)",
                display: "flex",
            }}
        >
            <BoardRoot data={data} />
        </div>
    );
}