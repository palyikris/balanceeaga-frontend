import { fetchCategoryCoverage } from "@/api/dashboard/fetchCategoryCoverage";
import { useQuery } from "@tanstack/react-query";

export const useCategoryCoverage = () => {
  return useQuery({
    queryKey: ["category-coverage"],
    queryFn: fetchCategoryCoverage,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}