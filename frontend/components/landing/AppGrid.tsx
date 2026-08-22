import Link from "next/link"
import {
  Users,
  Clock,
  Plane,
  Banknote,
  BarChart3,
  Settings,
  Briefcase,
  TrendingUp,
  LayoutDashboard,
  Files,
  CheckSquare,
  Calendar,
} from "lucide-react"

const APPS = [
  { name: "Employees", icon: Users, color: "bg-[#00A0D2]", shadow: "shadow-[#00A0D2]/20" },
  { name: "Attendance", icon: Clock, color: "bg-[#4CAF50]", shadow: "shadow-[#4CAF50]/20" },
  { name: "Time-Off", icon: Plane, color: "bg-[#9C27B0]", shadow: "shadow-[#9C27B0]/20" },
  { name: "Payroll", icon: Banknote, color: "bg-[#FF9800]", shadow: "shadow-[#FF9800]/20" },
  { name: "Reports", icon: BarChart3, color: "bg-[#F44336]", shadow: "shadow-[#F44336]/20" },
  { name: "Recruitment", icon: Briefcase, color: "bg-[#00BCD4]", shadow: "shadow-[#00BCD4]/20" },
  { name: "Performance", icon: TrendingUp, color: "bg-[#3F51B5]", shadow: "shadow-[#3F51B5]/20" },
  { name: "Dashboard", icon: LayoutDashboard, color: "bg-[#E91E63]", shadow: "shadow-[#E91E63]/20" },
  { name: "Documents", icon: Files, color: "bg-[#607D8B]", shadow: "shadow-[#607D8B]/20" },
  { name: "Approvals", icon: CheckSquare, color: "bg-[#8BC34A]", shadow: "shadow-[#8BC34A]/20" },
  { name: "Calendar", icon: Calendar, color: "bg-[#FF5722]", shadow: "shadow-[#FF5722]/20" },
  { name: "Settings", icon: Settings, color: "bg-[#9E9E9E]", shadow: "shadow-[#9E9E9E]/20" },
]

export function AppGrid() {
  return (
    <section id="apps" className="w-full py-4 flex flex-1 justify-center px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8">
          {APPS.map((app) => {
            const Icon = app.icon
            return (
              <Link
                key={app.name}
                href="/login"
                className="group flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Premium Glass Tile */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 transition-all duration-300 group-hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] group-hover:ring-slate-900/10">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${app.color} text-white shadow-md ${app.shadow} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                </div>
                {/* App Title */}
                <span className="text-sm font-semibold text-slate-700 tracking-tight text-center group-hover:text-slate-900 transition-colors">
                  {app.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
