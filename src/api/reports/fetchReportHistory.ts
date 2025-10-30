import api from "../api";

export type ReportHistory = Array<ReportData>

export interface ReportData {
  id: string;
  year: number;
  month: number;
  file_url: string;
  created_at: string;
  size_kb: number;
  month_label: string;
}

export async function fetchReportHistory(): Promise<ReportHistory> {
  const response = await api.get<ReportHistory>(`/reports/history`);
  return response.data;  
}