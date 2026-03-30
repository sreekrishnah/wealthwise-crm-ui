import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => api.get<any>("/clients").then(res => res.data.data),
  });
}

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api.get<any>("/dashboard").then(res => res.data),
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => api.get<any>("/reviews").then(res => res.data.data),
  });
}

export function useCompliance() {
  return useQuery({
    queryKey: ["compliance"],
    queryFn: () => api.get<any>("/compliance").then(res => res.data.data),
  });
}

export function usePipeline() {
  return useQuery({
    queryKey: ["pipeline"],
    queryFn: () => api.get<any>("/pipeline/stages").then(res => res.data),
  });
}

export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: () => api.get<any>("/goals").then(res => res.data),
  });
}
