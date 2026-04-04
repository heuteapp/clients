import { EdgeInsets, EdgeInsetsInput } from "../types/style";

export function normalizeEdgeInsets(input: EdgeInsetsInput): EdgeInsets {
    if (typeof input === 'number') {
        return { top: input, right: input, bottom: input, left: input };
    }
    if (Array.isArray(input)) {
        if (input.length === 2) {
            const [vertical, horizontal] = input;
            return { top: vertical, right: horizontal, bottom: vertical, left: horizontal };
        }
        const [top, right, bottom, left] = input;
        return { top, right, bottom, left };
    }
    return input;
}