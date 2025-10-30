import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type YearMonth = { years: number[]; monthsForYear: (y: number) => number[] };

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;

  // report creation controls
  year: number;
  setYear: (y: number) => void;
  month: number;
  setMonth: (m: number) => void;
  available: YearMonth; // derived from transactions or a fallback
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function ReportTableNav({
  step,
  setStep,
  currentPage,
  setCurrentPage,
  total,
  year,
  setYear,
  month,
  setMonth,
  available,
  onGenerate,
  isGenerating,
}: Props) {
  const maxPage = Math.max(1, Math.ceil(total / step));


  return (
    <tr className="border-t border-tealblue">
      {/* left controls: pagination & step */}
      <td className="relative p-4" colSpan={2}>
        <BlurFade
          className="flex items-center gap-4 flex-wrap"
          inView
          delay={0.1}
          direction="up"
        >
          <Button
            className="bg-limeneon/10 text-limeneon border border-limeneon/30 hover:bg-limeneon/20 cursor-pointer"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Előző
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-offwhite/70 text-sm">Sor / oldal</span>
            <Input
              value={step}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                if (!isNaN(v) && v > 0) {
                  setStep(v);
                  setCurrentPage(1);
                }
              }}
              className="w-16 text-center bg-graphite-900 border border-coolgray rounded text-offwhite outline-none"
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setStep((prev) => {
                    const next = prev + 1;
                    setCurrentPage(1);
                    return next;
                  });
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setStep((prev) => {
                    const next = Math.max(prev - 1, 1);
                    setCurrentPage(1);
                    return next;
                  });
                }
              }}
            />
          </div>

          <Button
            className="bg-limeneon/10 text-limeneon border border-limeneon/30 hover:bg-limeneon/20 cursor-pointer"
            onClick={() => setCurrentPage((p) => (p >= maxPage ? p : p + 1))}
            disabled={currentPage >= maxPage}
          >
            Következő
          </Button>

          <div className="flex items-center gap-2">
            <Input
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (!isNaN(page) && page >= 1 && page <= maxPage) {
                  setCurrentPage(page);
                }
              }}
              className="w-14 text-center bg-graphite-900 border border-coolgray rounded text-offwhite outline-none"
              onKeyDown={(k) => {
                if (k.key === "ArrowUp") {
                  k.preventDefault();
                  setCurrentPage((p) => (p < maxPage ? p + 1 : p));
                }
                if (k.key === "ArrowDown") {
                  k.preventDefault();
                  setCurrentPage((p) => (p > 1 ? p - 1 : p));
                }
              }}
            />
            <span className="text-offwhite/70">/ {maxPage}</span>
          </div>
        </BlurFade>

        <span className="absolute top-1/2 -translate-y-1/2 right-0 h-1/2 w-[1px] bg-electric/70"></span>
      </td>

      {/* right controls: year/month + generate */}
      <td colSpan={2} className="p-4">
        <BlurFade
          className="flex justify-end items-center gap-3 flex-wrap"
          inView
          delay={0.15}
          direction="up"
        >
          <select
            value={year}
            onChange={(e) => {
              const y = parseInt(e.target.value);
              setYear(y);
              // if current month not in available list for the new year, reset to first available
              const months = available.monthsForYear(y);
              if (!months.includes(month) && months.length > 0)
                setMonth(months[0]);
            }}
            className="bg-graphite text-offwhite border border-coolgray rounded p-2"
          >
            {available.years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="bg-graphite text-offwhite border border-coolgray rounded p-2"
          >
            {available.monthsForYear(year).map((m) => (
                <option key={m} value={m}>
                {new Date(year, m - 1, 1).toLocaleString("hu", { month: "long" })}
                </option>
            ))}
          </select>

          <Button
            disabled={isGenerating}
            onClick={onGenerate}
            className="bg-electric/10 text-electric border border-electric/30 hover:bg-electric/20"
          >
            {isGenerating ? "Készítés..." : "Új jelentés készítése"}
          </Button>
        </BlurFade>
      </td>
    </tr>
  );
}
