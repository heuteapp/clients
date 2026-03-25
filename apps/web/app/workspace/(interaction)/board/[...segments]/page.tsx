"use client";

import { useWorkspaceBoardContext } from "@/src/modules/workspace-board/hooks/useWorkspaceBoardContext";
import { WorkspaceBoardProvider } from "@/src/modules/workspace-board/providers/WorkspaceBoardProvider";

export default function WorkspaceBoardPage() {
    return (
        <WorkspaceBoardProvider>
            <HH />
        </WorkspaceBoardProvider>
    )
}

export function HH() {
    const { metadata } = useWorkspaceBoardContext();

    return (
        <div>
            <h1>Workspace Board</h1>
            <p>Categories: {metadata.categories.join(", ")}</p>
            <p>Category Depth: {metadata.categoryDepth}</p>
            <p>Date: {metadata.date?.display}</p>
            <p>Is Valid: {metadata.isValid ? "Yes" : "No"}</p>
            {metadata.errorMessage && <p style={{ color: "red" }}>Error: {metadata.errorMessage}</p>}
        </div>
    )
}