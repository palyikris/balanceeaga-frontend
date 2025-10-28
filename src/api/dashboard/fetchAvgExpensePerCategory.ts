import api from "../api";

export type AvgExpensePerCategory = Array<{
  category: string;
  average_expense: number;
}>;

export const fetchAvgExpensePerCategory = async (): Promise<AvgExpensePerCategory> => {
  const response = await api.get<AvgExpensePerCategory>("dashboard/avg-expense-per-category");
  return response.data;
}