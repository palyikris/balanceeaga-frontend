import { fetchAvailableYearsAndMonths } from "@/api/transactions/fetchAvailableYearsAndMonths";
import { useQuery } from "@tanstack/react-query";

export interface YearMonth {
  years: number[];
  monthsForYear: (y: number) => number[];
}

export function useAvailableYearsAndMonths() {
  return useQuery<YearMonth>({
    queryKey: ["availableYearsAndMonths"],
    queryFn: async () => {
      const data = await fetchAvailableYearsAndMonths();
      const years = Object.keys(data)
        .map((y) => parseInt(y, 10))
        .sort((a, b) => b - a);
      const monthsForYear = (y: number) => {
        return (data[y] || []).sort((a: number, b: number) => b - a);
      };
      return { years, monthsForYear };
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}