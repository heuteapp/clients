import { LayoutData, LayoutSectionData } from "./layout.data"

export type LayoutContentStore = LayoutContentValue & {
    setState: (value: LayoutContentValue) => void
} & LayoutContentActions;

export type LayoutContentValue = {  
    layout: LayoutData | null
    sections: LayoutSectionData[]
}

export type LayoutContentActions = {

}