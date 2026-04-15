export const safeMatches = <T>(
    state: T,
    value: T extends { matches: (value: infer V) => boolean } ? V : never
): boolean => {
    if (state && typeof state === 'object' && 'matches' in state) {
        const matches = (state as any).matches;
        if (typeof matches === 'function') {
            return matches(value);
        }
    }

    return false;
};