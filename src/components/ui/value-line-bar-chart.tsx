"use client";

import { Bar, BarChart, Cell, XAxis, ReferenceLine } from "recharts";
import React from "react";
import { AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useMotionValueEvent, useSpring } from "framer-motion";
import type { AvgExpensePerCategory } from "@/api/dashboard/fetchAvgExpensePerCategory";
import { TypingAnimation } from "../magicui/typing-animation";


const CHART_MARGIN = 35;
const chartConfig = {
  desktop: {
    label: "Category",
    color: "#00B3B3",
  },
} satisfies ChartConfig;

interface ValueLineBarChartProps {
  chartData: AvgExpensePerCategory;
}

export function ValueLineBarChart(props: ValueLineBarChartProps) {

  const { chartData } = props;

  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined
  );

  const maxValueIndex = React.useMemo(() => {
    // if user is moving mouse over bar then set value to the bar value
    if (activeIndex !== undefined) {
      return { index: activeIndex, value: chartData[activeIndex].average_expense };
    }
    // if no active index then set value to max value
    return chartData.reduce(
      (max, data, index) => {
        return data.average_expense > max.value ? { index, value: data.average_expense } : max;
      },
      { index: 0, value: 0 }
    );
  }, [activeIndex, chartData]);

  const maxValueIndexSpring = useSpring(maxValueIndex.value, {
    stiffness: 100,
    damping: 20,
  });

  const [springyValue, setSpringyValue] = React.useState(maxValueIndex.value);

  useMotionValueEvent(maxValueIndexSpring, "change", (latest) => {
    setSpringyValue(Number(latest.toFixed(0)));
  });

  React.useEffect(() => {
    maxValueIndexSpring.set(maxValueIndex.value);
  }, [maxValueIndex.value, maxValueIndexSpring]);

  return (
    <Card className="border-none bg-transparent">
      <CardHeader>
        <div className="w-full flex justify-start gap-4">
          <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-tealblue/20 w-1/3">
            <span className="text-xs uppercase text-offwhite/80">Összeg</span>
            <span className="mt-1 text-lg font-extrabold text-tealblue">
              {springyValue.toFixed(0)}{" "}
              <span className="text-sm font-medium">Ft</span>
            </span>
          </div>
          <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-tealblue/20 min-w-1/3 w-auto">
            <span className="text-xs uppercase text-offwhite/80">
              Kategória
            </span>
            <h1 className="mt-1 text-lg font-extrabold text-tealblue">
              <TypingAnimation className="mt-1 text-lg font-extrabold text-tealblue">
                {chartData[activeIndex ?? maxValueIndex.index]?.category ||
                  "N/A"}
              </TypingAnimation>
            </h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              onMouseLeave={() => setActiveIndex(undefined)}
              margin={{
                left: CHART_MARGIN,
              }}
            >
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3) + ".."}
              />
              <Bar
                dataKey="average_expense"
                fill="var(--color-desktop)"
                radius={4}
              >
                {chartData.map((_, index) => (
                  <Cell
                    className="duration-200"
                    opacity={index === maxValueIndex.index ? 1 : 0.2}
                    key={index}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                ))}
              </Bar>
              <ReferenceLine
                opacity={0.4}
                y={springyValue}
                stroke="#f5f5f5"
                strokeWidth={1}
                strokeDasharray="3 3"
                label={<CustomReferenceLabel value={maxValueIndex.value} />}
              />
            </BarChart>
          </ChartContainer>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

interface CustomReferenceLabelProps {
  viewBox?: {
    x?: number;
    y?: number;
  };
  value: number;
}

const CustomReferenceLabel: React.FC<CustomReferenceLabelProps> = (props) => {
  const { viewBox, value } = props;
  const x = viewBox?.x ?? 0;
  const y = viewBox?.y ?? 0;

  // we need to change width based on value length
  const width = React.useMemo(() => {
    const characterWidth = 8; // Average width of a character in pixels
    const padding = 10;
    return value.toString().length * characterWidth + padding;
  }, [value]);

  return (
    <>
      <rect
        x={x - CHART_MARGIN}
        y={y - 9}
        width={width}
        height={18}
        fill="var(--secondary-foreground)"
        rx={4}
      />
      <text
        fontWeight={600}
        x={x - CHART_MARGIN + 6}
        y={y + 4}
        fill="var(--primary-foreground)"
      >
        {value} Ft
      </text>
    </>
  );
};
