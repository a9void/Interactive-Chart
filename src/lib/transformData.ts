import JsonData from "../data/data.json";
import type {
  RawDataFile,
  Variation,
  VariationId,
  ChartPoint,
  RawDataPoint,
} from "../types/types";

interface RawVariations {
  id?: number;
  name: string;
}
type ConversionRates = Record<VariationId, number | null>;

const raw = JsonData as RawDataFile;

function normalizeVariations(rawVariations: RawVariations[]): Variation[] {
  return rawVariations.map((variant) => {
    const id =
      variant.id === undefined ? "0" : (String(variant.id) as VariationId);

    return { id, name: variant.name };
  });
}
export const variations = normalizeVariations(raw.variations);

export function getDayConversionRates(
  day: RawDataPoint,
  variations: Variation[]
): ConversionRates {
  const result: ConversionRates = {} as ConversionRates;

  for (const { id } of variations) {
    const visits = day.visits[id] ?? 0;
    const conversions = day.conversions[id] ?? 0;
    result[id] = visits > 0 ? (conversions / visits) * 100 : null;
  }

  return result;
}

export const dailyPoints: ChartPoint[] = raw.data.map((day) => ({
  date: day.date,
  ...getDayConversionRates(day, variations),
}));

export function groupByWeek(rawData: RawDataPoint[]): RawDataPoint[] {
  const weeks: RawDataPoint[] = [];

  for (let i = 0; i < rawData.length; i += 7) {
    const weekData = rawData.slice(i, i + 7);
    const weekStart = weekData[0].date;

    const weekVisits: Record<string, number> = {};
    const weekConversions: Record<string, number> = {};

    weekData.forEach((day) => {
      Object.entries(day.visits).forEach(([id, visits]) => {
        weekVisits[id] = (weekVisits[id] || 0) + visits;
      });

      Object.entries(day.conversions).forEach(([id, conversions]) => {
        weekConversions[id] = (weekConversions[id] || 0) + conversions;
      });
    });

    weeks.push({
      date: `Week of ${weekStart}`,
      visits: weekVisits,
      conversions: weekConversions,
    });
  }

  return weeks;
}
