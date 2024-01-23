"use client";

import exceptionService from "@/service/exceptionService";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import React from "react";

export default function QueryConfigContext({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const { resultCode } = error?.response?.data;
          console.log(resultCode);

          exceptionService(error);
        } else {
          console.error("An error occurred:", error.message);
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}