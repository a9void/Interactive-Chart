import type { ChartPoint, VariationId } from "../types/types";

export function calculateYAxisDomain(
  data: ChartPoint[],
  activeVariations: VariationId[]
): [number, number] {
  const visibleValues: number[] = [];

  data.forEach((point) => {
    activeVariations.forEach((id) => {
      const value = point[id];
      if (typeof value === "number") {
        visibleValues.push(value);
      }
    });
  });

  const minValue = Math.min(...visibleValues);
  const maxValue = Math.max(...visibleValues);

  const padding = (maxValue - minValue) * 0.1;
  const yMin = Math.max(0, minValue - padding);
  const yMax = maxValue + padding;

  return [yMin, yMax];
}
