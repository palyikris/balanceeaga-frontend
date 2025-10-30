import api from "../api";

export interface AvailableYearsAndMonths {
  [year: string]: number[];
}

export async function fetchAvailableYearsAndMonths() { 
  const res = await api.get(`/transactions/available-years-and-months`);
  return res.data
}