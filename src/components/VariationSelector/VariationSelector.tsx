import { useState } from "react";
import type { Variation, VariationId } from "../../types/types";
import styles from "./VariationSelector.module.css";

interface Props {
  variations: Variation[];
  activeVariations: VariationId[];
  onToggle: (id: VariationId) => void;
}

function formatVariationLabel(
  variations: Variation[],
  activeVariations: VariationId[]
): string {
  const count = activeVariations.length;

  if (count === variations.length) {
    return "All variations selected";
  }

  if (count === 1) {
    return (
      variations.find((variant) => variant.id === activeVariations[0])?.name ??
      "1 variation selected"
    );
  }

  return `${count} variations selected`;
}

export default function VariationSelector({
  variations,
  activeVariations,
  onToggle,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const label = formatVariationLabel(variations, activeVariations);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.button} onClick={toggleOpen}>
        <span className={styles.buttonLabel}>{label}</span>
        <span className={styles.arrow}>▾</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {variations.map((variation) => {
            const checked = activeVariations.includes(variation.id);
            return (
              <label key={variation.id} className={styles.item}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(variation.id)}
                />
                <span>{variation.name}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
