import api from "../api";

export interface CategoryCoverage {
  total_transactions: number;
  covered_transactions: number;
  coverage_percentage: number;
}

export const fetchCategoryCoverage = async (): Promise<CategoryCoverage> => {
  const response = await api.get<CategoryCoverage>("dashboard/category-coverage");
  return response.data;
};