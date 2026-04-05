import { Size } from "../types/common";
import { SpacingInput, SpacingResult, Length } from "../types/style";

export function spacingResult(input?: SpacingInput, parent?: Size): SpacingResult {
    if (input === undefined) {
        return { top: 0, right: 0, bottom: 0, left: 0 };
    }

    if (typeof input === 'number' || typeof input === 'string') {
        const value = resolveLength(input, parent?.width);
        return { top: value, right: value, bottom: value, left: value };
    }

    if (Array.isArray(input)) {
        if (input.length === 2) {
            const [vertical, horizontal] = input;
            return {
                top: resolveLength(vertical, parent?.height),
                right: resolveLength(horizontal, parent?.width),
                bottom: resolveLength(vertical, parent?.height),
                left: resolveLength(horizontal, parent?.width),
            };
        }
        const [top, right, bottom, left] = input;
        return {
            top: resolveLength(top, parent?.height),
            right: resolveLength(right, parent?.width),
            bottom: resolveLength(bottom, parent?.height),
            left: resolveLength(left, parent?.width),
        };
    }

    return {
        top: resolveLength(input.top, parent?.height),
        right: resolveLength(input.right, parent?.width),
        bottom: resolveLength(input.bottom, parent?.height),
        left: resolveLength(input.left, parent?.width),
    };
}

function resolveLength(value: Length, parentSize?: number): number {
    if (typeof value === 'number') {
        return value;
    }
    
    const stringValue = value.trim();
    if (stringValue.endsWith('%') && parentSize !== undefined) {
        const percentage = parseFloat(stringValue.slice(0, -1));
        if (!isNaN(percentage)) {
            return (percentage / 100) * parentSize;
        }
    }

    const parsed = parseFloat(stringValue);
    return isNaN(parsed) ? 0 : parsed;
}