export interface HeuteLayoutData {
  columnCount: number
  rowCount: number
  sections: LayoutSectionData[]
}

export interface LayoutSectionData {
  colIndex: number
  rowIndex: number
  colSpan: number
  rowSpan: number
}