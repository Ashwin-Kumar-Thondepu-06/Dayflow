"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { StatCard } from "@/components/common/StatCard"
import { DataTable, Column } from "@/components/common/DataTable"
import { Users, FileBarChart2, ShieldCheck, Banknote } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { fetchApi } from "@/lib/api"
import Link from "next/link"

const employeeColumns: Column<any>[] = [
  { header: "ID", accessorKey: "employeeCode" },
  { 
    header: "Name", 
    accessorKey: "firstName",
    cell: (item) => (
      <Link href={`/admin/employees/${item.id}`} className="hover:underline text-[#714B67] font-medium">
        {item.firstName} {item.lastName}
      </Link>
    )
  },
  { 
    header: "Role", 
    accessorKey: "designation",
    cell: (item) => item.designation?.name || 'N/A'
  },
  { 
    header: "Status", 
    accessorKey: "status",
    cell: (item) => (
      <Badge variant={item.status === "ACTIVE" ? "success" : "warning"}>
        {item.status}
      </Badge>
    )
  },
]

export default function AdminDashboardPage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchApi('/employees')
        if (response.success) {
          setEmployees(response.data.slice(0, 5)) // show top 5 recent
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Admin Overview" 
        description="Enterprise HRMS Administration Dashboard."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={loading ? "..." : employees.length.toString()}
          icon={Users}
          trend="up"
          trendValue="+12"
          description="this month"
        />
        <StatCard
          title="Avg Attendance"
          value="94%"
          icon={FileBarChart2}
          trend="down"
          trendValue="-1%"
          description="this week"
        />
        <StatCard
          title="Payroll Processed"
          value="$1.2M"
          icon={Banknote}
          description="Last month"
        />
        <StatCard
          title="Pending Audits"
          value="3"
          icon={ShieldCheck}
          trend="neutral"
          description="Requires attention"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight">Recent Employee Activity</h3>
        <DataTable columns={employeeColumns} data={employees} />
      </div>
    </div>
  )
}
