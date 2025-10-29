import type { AvgExpensePerCategory } from "@/api/dashboard/fetchAvgExpensePerCategory";
import { Card } from "../ui/card";
import { ValueLineBarChart } from "../ui/value-line-bar-chart";

interface AvgExpensePerCategoryProps {
  expenses: AvgExpensePerCategory;
}

export default function AvgExpensePerCategory(props: AvgExpensePerCategoryProps) {
  let { expenses } = props;

  expenses = expenses.sort((a, b) => b.average_expense - a.average_expense).map((item) => {
    return {
      category: item.category,
      average_expense: Math.round(Math.abs(item.average_expense)),
    };
  });

  return (
    <Card className="bg-graphite/50 p-6 w-full">
      <h2 className="text-xl font-bold mb-3 text-offwhite/80">
        Kategóriánkénti átlagos kiadás
      </h2>
      {/* <RoundedPieChart chartData={merchants}></RoundedPieChart> */}
      <ValueLineBarChart chartData={expenses}></ValueLineBarChart>
      {/* <ul className="divide-y divide-tealblue/30">
        {merchants?.map((m) => (
          <li key={m.name} className="flex justify-between py-2">
            <span className="text-offwhite/50">{m.name}</span>
            <span className="text-limeneon">
              {m.amount.toLocaleString()} Ft
            </span>
          </li>
        ))}
      </ul> */}
    </Card>
  );
}