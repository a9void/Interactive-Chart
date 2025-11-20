import { useState, useRef, useMemo } from "react";
import type {
  VariationId,
  RawDataPoint,
  Period,
  LineStyle,
} from "./types/types";
import {
  variations,
  dailyPoints,
  groupByWeek,
  getDayConversionRates,
} from "./lib/transformData";
import rawData from "./data/data.json";
import ConversionChart from "./components/ConversionChart/ConversionChart";
import VariationSelector from "./components/VariationSelector/VariationSelector";
import PeriodSelector from "./components/PeriodSelector/PeriodSelector";
import LineStyleSelector from "./components/LineStyleSelector/LineStyleSelector";
import ZoomControls from "./components/ZoomControls/ZoomControls";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import ExportButton from "./components/ExportButton/ExportButton";
import { useTheme } from "./hooks/useTheme";
import { useZoom } from "./hooks/useZoom";
import styles from "./App.module.css";

function App() {
  const [activeVariations, setActiveVariations] = useState<VariationId[]>(
    variations.map((variant) => variant.id)
  );
  const [period, setPeriod] = useState<Period>("day");
  const [lineStyle, setLineStyle] = useState<LineStyle>("smooth");
  const chartRef = useRef<HTMLDivElement>(null);

  const weeklyData = useMemo(
    () =>
      groupByWeek(rawData.data as RawDataPoint[]).map((weekPoint) => ({
        date: weekPoint.date,
        ...getDayConversionRates(weekPoint, variations),
      })),
    []
  );
  const data = period === "day" ? dailyPoints : weeklyData;

  const { theme, toggleTheme } = useTheme();
  const { range, startIndex, endIndex, zoomIn, zoomOut, resetZoom } = useZoom(
    data.length
  );

  const displayedData = useMemo(
    () => (range ? data.slice(startIndex, endIndex + 1) : data),
    [data, range, startIndex, endIndex]
  );

  const handleToggleVariation = (id: VariationId) => {
    setActiveVariations((prev) => {
      const isActive = prev.includes(id);

      if (isActive) {
        if (prev.length === 1) return prev; // не даём отключить последнюю
        return prev.filter((vId) => vId !== id);
      }

      return [...prev, id];
    });
  };

  const handleReset = () => {
    setActiveVariations(variations.map((v) => v.id));
    setPeriod("day");
    setLineStyle("smooth");
    resetZoom();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperControls}>
        <div className={styles.selectors}>
          <VariationSelector
            variations={variations}
            activeVariations={activeVariations}
            onToggle={handleToggleVariation}
          />
          <PeriodSelector period={period} onPeriodChange={setPeriod} />
        </div>
        <div className={styles.controls}>
          <LineStyleSelector
            lineStyle={lineStyle}
            onLineStyleChange={setLineStyle}
          />
          <ZoomControls
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onResetZoom={resetZoom}
            onReset={handleReset}
          />
          <ThemeToggle theme={theme} onThemeChange={toggleTheme} />
        </div>
      </div>

      <div ref={chartRef}>
        <ConversionChart
          data={displayedData}
          variations={variations}
          activeVariations={activeVariations}
          lineStyle={lineStyle}
          theme={theme}
        />
      </div>
      <div className={styles.wrapperBtn}>
        <ExportButton chartRef={chartRef} />
      </div>
    </div>
  );
}

export default App;
