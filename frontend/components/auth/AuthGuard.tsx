"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data, isLoading, error } = useAuth();

  useEffect(() => {
    if (!isLoading && error) {
      router.push("/login");
    }
  }, [isLoading, error, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return <>{children}</>;
}
