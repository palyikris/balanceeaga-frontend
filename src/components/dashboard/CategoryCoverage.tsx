import type { CategoryCoverage } from "@/api/dashboard/fetchCategoryCoverage";
import { Card } from "../ui/card";
import { CoveragePieChart } from "../ui/coverage-pie-chart";

interface CategoryCoverageProps {
  categoryCoverage: CategoryCoverage;
}

export default function CategoryCoverage(props: CategoryCoverageProps) {
  const { categoryCoverage } = props;


  return (
    <Card className="bg-graphite/50 p-6 w-full h-full ">
      <h2 className="text-xl font-bold mb-10 text-offwhite/80">
        Kategória lefedettség
      </h2>
      <CoveragePieChart data={categoryCoverage}></CoveragePieChart>
    </Card>
  );
}
