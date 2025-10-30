import api from "../api";


  export interface MonthlyReportResponse {
    detail: string;
    report: {
      id: string;
      year: number;
      month: number;
      file_url: string;
      created_at: string;
      size_kb: number;
    };
  }

export async function createMonthlyReport(month: string, year: number) {
  const response = await api.get(`/reports/monthly`, {
    params: { month, year },
  });

  return response.data;  
}