"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { CategoryCoverage } from "@/api/dashboard/fetchCategoryCoverage";

export const description = "A pie chart with a label list";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

interface CoveragePieChartProps {
  data: CategoryCoverage
}

const colors = [
  "#A3FF12",
  "#FF3CAC",
  "#00B3B3",
  "#6c71c2",
  "#95f7b1",
  "#cd9747",
];

export function CoveragePieChart(props: CoveragePieChartProps) {
  const { data } = props;

  const randomIndex = Math.floor(Math.random() * colors.length);

  const chartData = [
    {
      name: "Lefedett tranzakciók",
      amount: data.categorized_transactions,
      fill: colors[randomIndex],
    },
    {
      name: "Nem lefedett tranzakciók",
      amount: data.total_transactions - data.categorized_transactions,
      fill: colors[(randomIndex + 1) % colors.length],
    },
  ]

  return (
    <Card className="flex flex-col bg-transparent border-none p-0">
      <CardHeader>
        <div className="w-full">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-0 m-0 p-0 list-none">
            {chartData.map((entry, index) => (
              <li
                key={entry.name ?? index}
                className="flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-surface/5"
                role="listitem"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="shrink-0 w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                    aria-hidden="true"
                  />
                  <span
                    className="truncate text-sm text-offwhite/90"
                    title={entry.name}
                  >
                    {entry.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent needFt={false} />} />
            <Pie
              data={chartData}
              innerRadius={30}
              dataKey="amount"
              radius={10}
              cornerRadius={8}
              paddingAngle={4}
            >
              {/* <LabelList
                dataKey="amount"
                stroke="none"
                fontSize={12}
                fontWeight={500}
                fill="currentColor"
                formatter={(value: number) => value.toString()}
              /> */}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
