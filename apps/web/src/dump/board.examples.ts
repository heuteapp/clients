import { createDataIdentifier } from "../core/utils/shared/data";

export const sectionExamples = { 
  two:[
    {
      id: createDataIdentifier(),
      name: "first",
      colIndex: 1,
      rowIndex: 1,
      colSpan: 18,
      rowSpan: 4
    },
    {
      id: createDataIdentifier(),
      name: "second",
      colIndex: 1,
      rowIndex: 5,
      colSpan: 18,
      rowSpan: 4
    }
  ]
}