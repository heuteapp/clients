export const safeMatches = <T>(
  state: T,
  value?: T extends { matches: (v: infer V) => boolean } ? V : never
): boolean => {
    try {
        if (!state || typeof state !== 'object') {
            return false;
        }
        
        const matches = (state as any).matches;
        if (typeof matches !== 'function') {
            return false;
        }
        
        if (value === undefined || value === null) {
            return false;
        }
        
        return matches(value);
    } catch (error) {
        return false;
    }
};