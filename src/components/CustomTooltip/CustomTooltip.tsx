import styles from "./CustomTooltip.module.css";
import type { Variation, VariationId } from "../../types/types";
import { VARIATION_COLORS } from "../../constants/colors";
import { dateFormatters } from "../../helpers/dateFormatters";

interface TooltipPayload {
  dataKey: string;
  value: number | null;
}

interface Props {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  variations: Variation[];
}

export default function CustomTooltip({
  active,
  payload,
  label,
  variations,
}: Props) {
  if (!active || !payload || payload.length === 0) return null;
  const sortedPayload = [...payload].sort((a, b) => {
    const valueA = a.value ?? -Infinity;
    const valueB = b.value ?? -Infinity;
    return valueB - valueA;
  });

  const maxValue = Math.max(...sortedPayload.map((e) => e.value ?? -Infinity));

  const formattedDate = label ? dateFormatters(label) : "";

  return (
    <div className={styles.tooltip}>
      <div className={styles.date}>
        <span className={styles.icon}>📅</span>
        {formattedDate}
      </div>

      {sortedPayload.map((entry) => {
        const id = entry.dataKey as VariationId;
        const variation = variations.find((variant) => variant.id === id);
        const isWinner = entry.value === maxValue && entry.value !== null;

        return (
          <div key={id} className={styles.row}>
            <div className={styles.left}>
              <span
                className={styles.dot}
                style={{ backgroundColor: VARIATION_COLORS[id] }}
              />
              <span className={styles.name}>{variation?.name ?? id}</span>
              {isWinner && <span className={styles.trophy}>🏆</span>}
            </div>
            <span className={styles.value}>
              {entry.value == null
                ? "-"
                : `${Number(entry.value).toFixed(2).replace(".", ",")}%`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
