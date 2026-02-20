import Dayboard from "@/src/components/dayboard";
import styles from "./page.module.css";
import HeuteDomain from "@/src/library/main";

const heuteApp = new HeuteDomain();

export default function DayboardPage() {
  const layout = heuteApp.dayboard.layouts.get("default")!;

  return (
    <div className={styles.body}>
      <Dayboard data={{ layout }} />
    </div>
  );
}