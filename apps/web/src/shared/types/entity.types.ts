/**
 * Base interface for all domain objects in the application.
 * Every object has a unique client-side identifier (UUID).
 * This ID is used for local state management, React reconciliation,
 * and referencing objects within the client.
 */
export interface Entity {

    /** 
     * Unique client-side identifier (UUID v4)
     * @example "423c69ce-3756-4dc1-aedc-619f16cc12ba"
     */
    id: string;
}