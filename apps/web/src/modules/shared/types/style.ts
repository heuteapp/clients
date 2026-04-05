export type BoxStyle = {
    padding?: Padding;
    margin?: Margin;
}

export type Padding = EdgeInsetsInput;

export type Margin = EdgeInsetsInput;

export type EdgeInsets = {
    top: EdgeInsetsValue;
    right: EdgeInsetsValue;
    bottom: EdgeInsetsValue;
    left: EdgeInsetsValue;
}

type EdgeInsetsValue = number | string;

export type EdgeInsetsInput = 
    | EdgeInsetsValue 
    | [EdgeInsetsValue, EdgeInsetsValue] 
    | [EdgeInsetsValue, EdgeInsetsValue, EdgeInsetsValue, EdgeInsetsValue] 
    | EdgeInsets;