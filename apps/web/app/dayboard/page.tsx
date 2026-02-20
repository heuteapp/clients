import Dayboard from "@/src/ui/components/dayboard";
import styles from "./page.module.css";
import { HeuteDomain } from "@heuteapp/core";
import { boardField, boardLayout } from "@heuteapp/models";

const heuteApp = new HeuteDomain();

export default function DayboardPage() {
  const layout = boardLayout("default", {
    fields: [
      boardField("first", {
        grid: {
          cols: 18,
          rows: 4
        },
        bounds: { x1: 0, y1: 0, x2: 100, y2: 50 }
      }),
      boardField("second", {
        grid: {
          cols: 18,
          rows: 4
        },
        bounds: { x1: 0, y1: 50, x2: 100, y2: 100 }
      })
    ]
  });

  return (
    <div className={styles.body}>
      <Dayboard data={{ layout }} />
    </div>
  );
}