import { UniversalSelector } from "../../UI/UniversalSelector/UniversalSelector";
import { LINE_STYLE_OPTIONS } from "../../constants/lineStyles";
import type { LineStyle } from "../../types/types";

interface Props {
  lineStyle: LineStyle;
  onLineStyleChange: (lineStyle: LineStyle) => void;
}

export default function LineStyleSelector({
  lineStyle,
  onLineStyleChange,
}: Props) {
  return (
    <UniversalSelector
      value={lineStyle}
      options={LINE_STYLE_OPTIONS}
      onChange={onLineStyleChange}
      buttonPrefix="Line style"
    />
  );
}
