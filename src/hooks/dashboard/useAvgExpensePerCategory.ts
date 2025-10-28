import { fetchAvgExpensePerCategory } from "@/api/dashboard/fetchAvgExpensePerCategory";
import { useQuery } from "@tanstack/react-query";

export const useAvgExpensePerCategory = () => {
  return useQuery({
    queryKey: ["avg-expense-per-category"],
    queryFn: fetchAvgExpensePerCategory,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}