import { PageHeader } from "@/components/common/PageHeader"
import { StatCard } from "@/components/common/StatCard"
import { DataTable, Column } from "@/components/common/DataTable"
import { Users, FileBarChart2, ShieldCheck, Banknote } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const employeeData = [
  { id: "EMP001", name: "Alice Johnson", role: "Software Engineer", status: "Active" },
  { id: "EMP002", name: "Bob Smith", role: "Product Manager", status: "Active" },
  { id: "EMP003", name: "Charlie Davis", role: "UX Designer", status: "On Leave" },
  { id: "EMP004", name: "Diana Prince", role: "HR Specialist", status: "Active" },
]

const employeeColumns: Column<any>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Role", accessorKey: "role" },
  { 
    header: "Status", 
    accessorKey: "status",
    cell: (item) => (
      <Badge variant={item.status === "Active" ? "success" : "warning"}>
        {item.status}
      </Badge>
    )
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Admin Overview" 
        description="Enterprise HRMS Administration Dashboard."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value="248"
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
        <DataTable columns={employeeColumns} data={employeeData} />
      </div>
    </div>
  )
}
