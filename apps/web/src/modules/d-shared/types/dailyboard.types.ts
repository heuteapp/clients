import { YYMMDDDate } from "./date.types";

export interface DailyboardPathConfig {
    minCategories?: number;
    maxCategories?: number;
    requireDate?: boolean;
}

export interface DailyboardPath {
    categories: string[];
    date: YYMMDDDate | null;
}

export interface DailyboardPathValidationResult {
    isValid: boolean;
    errors?: string[];
}