import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGet, apiPost } from "./client";
import type {
  BookingPayload,
  BookingResponse,
  Branch,
  ContentBlock,
  Service,
  ServiceCategory,
} from "./types";

export function useBranches() {
  return useQuery({
    queryKey: ["branches"],
    queryFn: () => apiGet<Branch[]>("/api/branches/"),
  });
}

export function useServiceCategories() {
  return useQuery({
    queryKey: ["service-categories"],
    queryFn: () => apiGet<ServiceCategory[]>("/api/service-categories/"),
  });
}

export function useService(slug: string | undefined) {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: () => apiGet<Service>(`/api/services/${slug}/`),
    enabled: Boolean(slug),
  });
}

/** Site copy keyed by block key, editable from the back office. */
export function useContent() {
  return useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      const blocks = await apiGet<ContentBlock[]>("/api/content/");
      return Object.fromEntries(blocks.map((b) => [b.key, b]));
    },
  });
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: (payload: BookingPayload) =>
      apiPost<BookingResponse>("/api/bookings/", payload),
  });
}
