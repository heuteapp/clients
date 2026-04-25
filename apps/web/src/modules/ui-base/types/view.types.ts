import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";

export type ViewKey = string | null;

export type ViewStateType = ViewStateValue;

export type ViewStateValue = {
    [key: string]: any;
}

export type ViewClassNameValue = string[];

export type ViewClassNameType<TKey extends string = string> = { [key in TKey]: ViewClassNameValue; } & { body: ViewClassNameValue} 

export type ViewSxValue = SxProps<Theme>;

export type ViewSxType<TKey extends string = string> = { [key in TKey]: ViewSxValue; } & { body: ViewSxValue} 

export type ViewRenderValue = (content: any) => React.ReactNode;

export type ViewRenderType<TKey extends string = string> = { [key in TKey]: ViewRenderValue; }