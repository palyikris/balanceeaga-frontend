"use client";

import dayjs from "dayjs";
import { BlurFade } from "@/components/magicui/blur-fade";
import ReportTableNav from "./ReportTableNav";
import { useState, useMemo } from "react";
import type { YearMonth } from "@/hooks/transactions/useAvailableYearsAndMonths";
import type { ReportHistory } from "@/api/reports/fetchReportHistory";
import { useCreateMonthlyReport } from "@/hooks/reports/useCreateMonthlyReport";
import { Button } from "../ui/button";


interface Props {
  data: ReportHistory;
  available: YearMonth;
  initialYear: number;
  initialMonth: number;
}

export default function ReportTable({
  data = [],
  available,
  initialYear,
  initialMonth,
}: Props) {
  const [step, setStep] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const slice = useMemo(() => {
    const start = (currentPage - 1) * step;
    return data.slice(start, start + step);
  }, [data, currentPage, step]);
  
  const createReport = useCreateMonthlyReport(String(month), year);

  const onGenerate = () => {
    createReport.mutate();
  }

  return (
    <table className="w-full text-left border-collapse mt-4">
      <thead>
        <tr className="border-b border-tealblue text-sm text-offwhite/80">
          <th className="p-2">Hónap</th>
          <th className="p-2">Létrehozva</th>
          <th className="p-2">Méret</th>
          <th className="p-2 text-center">Letöltés</th>
        </tr>
      </thead>
      <tbody>
        {slice.length > 0 ? (
          slice.map((r, i) => (
            <tr
              key={r.id}
              className="border-b border-gray-800 hover:bg-gray-800/40 text-offwhite/70"
            >
              <td className="p-2">
                <BlurFade inView delay={i * 0.08}>
                  {r.month_label}
                </BlurFade>
              </td>
              <td className="p-2">
                <BlurFade inView delay={i * 0.08}>
                  {dayjs(r.created_at).format("YYYY. MM. DD. HH:mm")}
                </BlurFade>
              </td>
              <td className="p-2">
                <BlurFade inView delay={i * 0.08}>
                  {r.size_kb} KB
                </BlurFade>
              </td>
              <td className="p-2 text-center">
                <BlurFade inView delay={i * 0.08}>
                  <a
                    href={r.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-tealblue/10 text-tealblue border border-tealblue/30 hover:bg-tealblue/20 cursor-pointer">
                      Letöltés
                    </Button>
                  </a>
                </BlurFade>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={4}
              className="text-center py-8 text-offwhite/50 italic"
            >
              Nincsenek elérhető jelentések.
            </td>
          </tr>
        )}

        {/* Footer navigation + year/month + generate */}
        <ReportTableNav
          step={step}
          setStep={setStep}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={data.length}
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          available={available}
          onGenerate={onGenerate}
          isGenerating={createReport.isPending}
        />
      </tbody>
    </table>
  );
}
