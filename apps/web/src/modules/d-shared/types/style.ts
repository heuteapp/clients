export type BoxStyle = {
    padding?: Padding;
    margin?: Margin;
}

export type Padding = SpacingInput;

export type Margin = SpacingInput;


export type SpacingInset = {
    top: Length;
    right: Length;
    bottom: Length;
    left: Length;
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
    | SpacingInset;


export type Length = LengthNumber | LengthString;

export type LengthNumber = number;

export type LengthString = string;