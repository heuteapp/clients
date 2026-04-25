import { BoardRoot } from "../../ux-board/components/BoardRoot";
import { WorkspaceDailyboardProps } from "../types/workspace-dailyboard.props";

export function WorkspaceDailyboardView({ rootRef, src, canvasSrc }: WorkspaceDailyboardProps) {
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
            <BoardRoot rootRef={rootRef} src={src} canvasSrc={canvasSrc} />
        </div>
    );
}