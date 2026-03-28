export interface Category {
    name: string;
    path: string;
    level: number;
    parentName?: string;
    children?: Category[];
}

export type CategoryData = Omit<Category, "children"> 