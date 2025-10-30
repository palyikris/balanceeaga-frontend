import { createMonthlyReport } from "@/api/reports/createMonthlyReport";
import { notify } from "@/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useCreateMonthlyReport(month: string, year: number) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createMonthlyReport", month, year],
    mutationFn: () => createMonthlyReport(month, year),
    retry: 1,
    retryDelay: 10000,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportHistory"] });
      notify.success("Havi jelentés létrehozva.");
    },
    onError: (error) => {
      console.error("Error creating monthly report:", error);
      notify.error("Havi jelentés létrehozása sikertelen. Kérjük, próbálja újra.");
    },
  });
}