"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { DataTable, Column } from "@/components/common/DataTable"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchApi } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { CalendarClock } from "lucide-react"

const attendanceColumns: Column<any>[] = [
  { 
    header: "Date", 
    accessorKey: "date",
    cell: (item) => new Date(item.date).toLocaleDateString()
  },
  { 
    header: "Status", 
    accessorKey: "status",
    cell: (item) => (
      <Badge variant={
        item.status === "PRESENT" ? "success" : 
        item.status === "ABSENT" ? "destructive" : 
        "warning"
      }>
        {item.status}
      </Badge>
    )
  },
  { 
    header: "Check In", 
    accessorKey: "checkIn",
    cell: (item) => item.checkIn ? new Date(item.checkIn).toLocaleTimeString() : "--"
  },
  { 
    header: "Check Out", 
    accessorKey: "checkOut",
    cell: (item) => item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : "--"
  },
  { 
    header: "Work Minutes", 
    accessorKey: "workMinutes",
    cell: (item) => item.workMinutes ? `${Math.floor(item.workMinutes / 60)}h ${item.workMinutes % 60}m` : "--"
  },
]

export default function EmployeeAttendancePage() {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        // Fetches monthly attendance for the current user
        const response = await fetchApi('/attendance/me')
        if (response.success) {
          setRecords(response.data)
        }
      } catch (error: any) {
        toast({ title: "Error", description: "Failed to load attendance records", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [toast])

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Attendance" 
        description="View your daily check-in and check-out logs."
      />

      <Card className="p-4 border-t-4 border-t-[#714B67]">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 pb-2">
            <CalendarClock className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold tracking-tight">Recent Records</h3>
          </div>
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">Loading attendance...</div>
          ) : (
            <DataTable columns={attendanceColumns} data={records} />
          )}
        </div>
      </Card>
    </div>
  )
}
