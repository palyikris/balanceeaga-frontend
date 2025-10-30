import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import ReportTable from "@/components/reports/ReportTable";
import { useReportHistory } from "@/hooks/reports/useReportHistory";
import { useAvailableYearsAndMonths } from "@/hooks/transactions/useAvailableYearsAndMonths";


export default function Reports() {

  const { data: reports, isLoading } = useReportHistory();
  const { data: available, isLoading: availableLoading } = useAvailableYearsAndMonths();

  const initialYear = available?.years[0] || new Date().getFullYear();
  const initialMonth =
    available?.monthsForYear(initialYear)[0] || new Date().getMonth() + 1;
  

  if (isLoading || availableLoading || !available) {
    return (
      <Card className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
        <div className="flex flex-col justify-between items-center mt-4 py-6">
          <h1 className="font-bold text-tealblue mb-8 text-2xl">
            Jelentések betöltése...
          </h1>
          <Spinner color="#00B3B3" size={30} />
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex w-full flex-col mx-auto max-w-7xl mt-30 px-4 overflow-hidden pb-6 relative mb-8 space-y-6">
      <h1 className="text-2xl font-bold text-limeneon text-center pt-6">
        Pénzügyi Jelentések
      </h1>

      <ReportTable
        data={reports ?? []}
        available={available}
        initialYear={initialYear}
        initialMonth={initialMonth}
      />
    </Card>
  );
}
