"use client";

import { useQuery } from "@tanstack/react-query";
import { me } from "@/services/auth.service";

export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: false,
  });
};
