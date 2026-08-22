"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { DataTable, Column } from "@/components/common/DataTable"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchApi } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { CalendarClock } from "lucide-react"

const attendanceColumns: Column<any>[] = [
  { 
    header: "Employee", 
    accessorKey: "employee",
    cell: (item) => `${item.employee?.firstName} ${item.employee?.lastName}`
  },
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
]

export default function AdminAttendancePage() {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dateStr, setDateStr] = useState<string>(new Date().toISOString().split('T')[0])
  const { toast } = useToast()

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const response = await fetchApi(`/attendance?date=${dateStr}`)
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
  }, [dateStr, toast])

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance Roster" 
        description="Monitor daily attendance across the organization."
      />
      
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg border shadow-sm">
        <CalendarClock className="h-5 w-5 text-muted-foreground" />
        <div className="flex items-center space-x-2 w-full max-w-sm">
          <Label htmlFor="date-filter" className="whitespace-nowrap">Filter Date:</Label>
          <Input 
            id="date-filter"
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <Card className="p-4 border-t-4 border-t-[#714B67]">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight">Attendance Records ({records.length})</h3>
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
