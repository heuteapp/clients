import LayoutSectionData from "@/src/data/domain/layout/LayoutSectionData"

export default function analyzeLayout(sections : LayoutSectionData[]) {
    let maxHorizontal = 0
    let maxVertical = 0

    const maxRow = Math.max(...sections.map(s => s.rowIndex + s.rowSpan))
    const maxCol = Math.max(...sections.map(s => s.colIndex + s.colSpan))

    for (let row = 1; row <= maxRow; row++) {
        const count = sections.filter(s =>
        row >= s.rowIndex &&
        row < s.rowIndex + s.rowSpan
        ).length

        maxHorizontal = Math.max(maxHorizontal, count)
    }

    for (let col = 1; col <= maxCol; col++) {
        const count = sections.filter(s =>
        col >= s.colIndex &&
        col < s.colIndex + s.colSpan
        ).length

        maxVertical = Math.max(maxVertical, count)
    }

    return {
        maxHorizontal,
        maxVertical
    }
}