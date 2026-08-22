"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { StatCard } from "@/components/common/StatCard"
import { Users, CalendarClock, PlaneTakeoff } from "lucide-react"
import { useAuth } from "@/components/providers/AuthContext"
import { fetchApi } from "@/lib/api"
import { Badge } from "@/components/ui/badge"

export default function EmployeeDashboardPage() {
  const { user } = useAuth()
  const [attendance, setAttendance] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchApi('/attendance/me')
        if (response.success) {
          setAttendance(response.data)
        }
      } catch (error) {
        console.error("Failed to load attendance", error)
      }
    }
    loadData()
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description={`Welcome back, ${user?.employee?.firstName || user?.email || 'User'}.`}
      />
      
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Attendance Score"
          value="98%"
          icon={CalendarClock}
          trend="up"
          trendValue="+2%"
          description="from last month"
        />
        <StatCard
          title="Available Leave"
          value="14 Days"
          icon={PlaneTakeoff}
          description="Annual leave balance"
        />
        <StatCard
          title="Team Size"
          value="12"
          icon={Users}
          description="Colleagues in your department"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="flex flex-col gap-2 min-h-[200px] border-2 border-dashed rounded-md p-4">
            {attendance.length > 0 ? (
              attendance.slice(0, 5).map((record, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-md border">
                  <div>
                    <p className="font-medium text-sm">{new Date(record.date).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">Check-in: {record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '--'}</p>
                  </div>
                  <Badge variant={record.status === 'PRESENT' ? 'success' : 'warning'}>{record.status}</Badge>
                </div>
              ))
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No recent activity
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3 rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Upcoming Leaves</h3>
          <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground border-2 border-dashed rounded-md">
            No upcoming leaves
          </div>
        </div>
      </div>
    </div>
  )
}
