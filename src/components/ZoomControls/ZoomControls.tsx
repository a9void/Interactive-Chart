import styles from "./ZoomControls.module.css";
import IconButton from "../../UI/IconButton/IconButton";

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onReset: () => void;
}

export default function ZoomControls({
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onReset,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <IconButton onClick={onResetZoom} title="Reset zoom" icon="↖" />

      <div className={styles.group}>
        <IconButton onClick={onZoomOut} title="Zoom out" icon="−" />
        <IconButton onClick={onZoomIn} title="Zoom in" icon="+" />
      </div>

      <IconButton onClick={onReset} title="Refresh" icon="↻" />
    </div>
  );
}
