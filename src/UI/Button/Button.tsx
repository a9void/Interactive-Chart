import styles from "./Button.module.css";

interface Props {
  onClick: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Button({ onClick, title, children }: Props) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}
