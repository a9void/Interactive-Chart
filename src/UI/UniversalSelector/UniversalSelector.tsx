import { useState } from "react";
import styles from "./UniversalSelector.module.css";

interface Option<T> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  buttonPrefix: string;
}

export function UniversalSelector<T extends string>({
  value,
  options,
  onChange,
  buttonPrefix,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const currentLabel = options.find((opt) => opt.value === value)?.label ?? value;

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.button} onClick={toggleOpen}>
        <span>
          {buttonPrefix}: {currentLabel}
        </span>
        <span className={styles.arrow}>▾</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <label key={option.value} className={styles.item}>
              <input
                type="radio"
                name={buttonPrefix}
                value={option.value}
                checked={value === option.value}
                onChange={() => handleSelect(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
