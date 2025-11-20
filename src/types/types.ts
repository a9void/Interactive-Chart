// Приходящие данные
export interface RawDataPoint {
  date: string;
  visits: Partial<Record<VariationId, number>>;
  conversions: Partial<Record<VariationId, number>>;
}

export interface RawDataFile {
  variations: { id?: number; name: string }[];
  data: RawDataPoint[];
}

// Нормализованные обьекты
export type VariationId = "0" | "10001" | "10002" | "10003";

export interface Variation {
  id: VariationId;
  name: string;
}

// Данные для графика
export interface ChartPoint {
  date: string;
  [key: string]: number | string | null;
}

// UI типы

export type LineStyle = "line" | "smooth" | "area";
export type Theme = "light" | "dark";
export type Period = "day" | "week";
