"use client";
import React from "react";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children
  );
}
