import { LayoutSectionData } from "@/src/types/layout/data"
import { LayoutSectionsCount } from "@/src/ui/types/layout/layout.dom";

export function calculateSectionsCount(sections: LayoutSectionData[]): LayoutSectionsCount {

    if (sections.length === 0) {
        return {
            horizontal: 0,
            vertical: 0
        }
    }

    let sectionCount = { horizontal: 0, vertical: 0 }
    {
        const maxRow = Math.max(...sections.map(s => s.rowIndex + s.rowSpan))
        const maxCol = Math.max(...sections.map(s => s.colIndex + s.colSpan))

        for (let row = 1; row <= maxRow; row++) {
            let count = 0

            for (const s of sections) {
                if (row >= s.rowIndex && row < s.rowIndex + s.rowSpan) {
                    count++
                }
            }

            sectionCount.horizontal = Math.max(sectionCount.horizontal, count)
        }

        for (let col = 1; col <= maxCol; col++) {
            let count = 0

            for (const s of sections) {
                if (col >= s.colIndex && col < s.colIndex + s.colSpan) {
                    count++
                }
            }

            sectionCount.vertical = Math.max(sectionCount.vertical, count)
        }
    }

    return sectionCount;
}