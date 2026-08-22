import { PageHeader } from "@/components/common/PageHeader"
import { StatCard } from "@/components/common/StatCard"
import { Users, CalendarClock, PlaneTakeoff } from "lucide-react"

export default function EmployeeDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Welcome to your employee dashboard."
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
          <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground border-2 border-dashed rounded-md">
            Placeholder for activity feed
          </div>
        </div>
        <div className="col-span-3 rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Upcoming Leaves</h3>
          <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground border-2 border-dashed rounded-md">
            Placeholder for upcoming leaves
          </div>
        </div>
      </div>
    </div>
  )
}
