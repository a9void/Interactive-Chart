import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type {
  ChartPoint,
  VariationId,
  Variation,
  LineStyle,
  Theme,
} from "../../types/types";
import styles from "./ConversionChart.module.css";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { VARIATION_COLORS } from "../../constants/colors";
import { dateFormatters } from "../../helpers/dateFormatters";
import { calculateYAxisDomain } from "../../helpers/chartCalculations";
interface Props {
  data: ChartPoint[];
  variations: Variation[];
  activeVariations: VariationId[];
  lineStyle: LineStyle;
  theme: Theme;
}

export default function ConversionChart({
  data,
  variations,
  activeVariations,
  lineStyle,
  theme,
}: Props) {
  const [yMin, yMax] = calculateYAxisDomain(data, activeVariations);

  const getLineColor = (id: VariationId): string => {
    if (id === "0" && theme === "dark") {
      return "#ffffff";
    }
    return VARIATION_COLORS[id];
  };

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="15 15" />
          <XAxis
            dataKey="date"
            tickFormatter={dateFormatters}
            tick={{
              fontSize: 11,
              fontWeight: 500,
              fill: "#918F9A",
            }}
            tickLine={false}
          />
          <YAxis
            tick={{
              fontSize: 11,
              fontWeight: 500,
              fill: "#918F9A",
            }}
            tickLine={false}
            domain={[yMin, yMax]}
            tickFormatter={(value) => `${Math.round(value)}%`}
          />
          <Tooltip content={<CustomTooltip variations={variations} />} />

          {activeVariations.map((id) => {
            const lineType = lineStyle === "line" ? "linear" : "monotone";
            const color = getLineColor(id);

            if (lineStyle === "area") {
              return (
                <Area
                  key={id}
                  type={lineType}
                  dataKey={id}
                  stroke={color}
                  fill={color} 
                  strokeWidth={2}
                  fillOpacity={0.4}
                  connectNulls={false}
                  isAnimationActive={false}
                />
              );
            }

            return (
              <Line
                key={id}
                type={lineType}
                dataKey={id}
                stroke={color} 
                dot={false}
                strokeWidth={2}
                connectNulls={false}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
