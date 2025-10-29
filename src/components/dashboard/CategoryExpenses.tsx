import { Card } from "../ui/card";
import { RoundedPieChart } from "../ui/rounded-pie-chart";

interface CategoryExpenses {
  categoryExpenses: { category: string; amount: number }[];
}

export default function CategoryExpenses(props: CategoryExpenses) {
  const { categoryExpenses } = props;


  categoryExpenses.forEach((ce) => {
    ce.amount = Math.abs(ce.amount);
  });

  return (
    <Card className="bg-graphite/50 p-6 w-full h-full">
      <h2 className="text-xl font-bold mb-3 text-offwhite/80">
        Top kategória kiadások
      </h2>
      <RoundedPieChart chartData={categoryExpenses}></RoundedPieChart>
    </Card>
  );
}
