"use client"
import * as React from "react"
import { DashboardNav } from "@/components/dashboard/DashboardNav"
import { AttendanceProvider } from "@/components/dashboard/AttendanceContext"
import { useAuth } from "@/components/providers/AuthContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-[#714B67] animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return null // AuthContext will handle the redirect
  }

  return (
    <AttendanceProvider>
      <div className="flex min-h-screen flex-col bg-slate-50/50">
        <DashboardNav />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </AttendanceProvider>
  )
}
