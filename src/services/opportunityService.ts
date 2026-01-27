import { api } from "./api";
import { Opportunity } from "@/types/opportunity";

export const fetchOpportunities = async (
  category?: string
): Promise<Opportunity[]> => {
  const url = category
    ? `/opportunities?category=${category}`
    : "/opportunities";

  const res = await api.get(url);
  return res.data;
};
