import styles from "./IconButton.module.css";

interface IconButtonProps {
  onClick: () => void;
  title: string;
  icon: string;
}

export default function IconButton({ onClick, title, icon }: IconButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      title={title}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
}
