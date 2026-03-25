/**
 * Base interface for UI state objects
 * Uses UUID for React keys and local state management
 */
export interface UIEntity {
    
  /** UUID v4 identifier */
  id: string;
}