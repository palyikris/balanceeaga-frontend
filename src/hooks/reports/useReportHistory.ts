import { fetchReportHistory } from "@/api/reports/fetchReportHistory";
import { useQuery } from "@tanstack/react-query";

export function useReportHistory() {
  return useQuery({
    queryKey: ["reportHistory"],
    queryFn: fetchReportHistory,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}