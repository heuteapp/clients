export type BoxStyle = {
    padding?: Padding;
    margin?: Margin;
}

export type Padding = SpacingInput;

export type Margin = SpacingInput;

export type Spacing = {
    top: SpacingInput;
    right: SpacingInput;
    bottom: SpacingInput;
    left: SpacingInput;
}

export type SpacingResult = {
    top: LengthNumber;
    right: LengthNumber;
    bottom: LengthNumber;
    left: LengthNumber;
}

export type SpacingInput = 
    | Length 
    | [Length, Length] 
    | [Length, Length, Length, Length] 
    | Spacing;

export type Length = LengthNumber | LengthString;

export type LengthNumber = number;

export type LengthString = string;