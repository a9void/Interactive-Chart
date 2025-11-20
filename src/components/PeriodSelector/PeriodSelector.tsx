import { UniversalSelector } from "../../UI/UniversalSelector/UniversalSelector";
import { PERIOD_OPTIONS } from "../../constants/periods";
import type { Period } from "../../types/types";

interface Props {
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export default function PeriodSelector({ period, onPeriodChange }: Props) {
  return (
    <UniversalSelector
      value={period}
      options={PERIOD_OPTIONS}
      onChange={onPeriodChange}
      buttonPrefix="Period"
    />
  );
}
