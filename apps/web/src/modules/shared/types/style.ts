export type BoxStyle = {
    padding?: Padding;
    margin?: Margin;
}

export type Padding = EdgeInsetsInput;

export type Margin = EdgeInsetsInput;

export type EdgeInsets = {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export type EdgeInsetsInput = 
    | number 
    | [number, number] 
    | [number, number, number, number] 
    | EdgeInsets;