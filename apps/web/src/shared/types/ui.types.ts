/**
 * Base interface for UI state objects
 * Uses UUID for React keys and local state management
 */
export interface UIEntity {
    
    /** UUID v4 identifier */
    id: string;
}

//

/**
 * Base interface for UI nodes in registries
 * Contains a ref for DOM access and manipulation
 */
export interface UINode {

    /** Optional ref to the DOM element */
    ref?: React.RefObject<HTMLDivElement | null> | null
}

/**
 * Base interface for UI root nodes, extending UINode
 * Ensures a ref is always present for root nodes
 */
export interface UIRootNode extends UINode {

    /** Ref is required for root nodes */
    ref: React.RefObject<HTMLDivElement | null>
}