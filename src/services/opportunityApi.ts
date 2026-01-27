import { api } from "./api";

export const fetchOpportunities = async (category?: string) => {
  const res = await api.get("/opportunities", {
    params: category ? { category } : {},
  });
  return res.data;
};
