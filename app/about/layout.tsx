"use client"

import { QueryClient, QueryClientProvider } from "react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient()

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {children}
      </div>
    </QueryClientProvider>
  )
}
