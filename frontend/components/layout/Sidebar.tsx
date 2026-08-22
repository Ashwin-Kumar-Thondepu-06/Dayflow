"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  PlaneTakeoff, 
  Banknote, 
  FileText, 
  Settings,
  ShieldCheck,
  FileBarChart2
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type NavItem = {
  title: string
  href: string
  icon: React.ElementType
}

const employeeNav: NavItem[] = [
  { title: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
  { title: "Profile", href: "/employee/profile", icon: Users },
  { title: "Attendance", href: "/employee/attendance", icon: CalendarClock },
  { title: "Leave", href: "/employee/leave", icon: PlaneTakeoff },
  { title: "Payroll", href: "/employee/payroll", icon: Banknote },
  { title: "Documents", href: "/employee/documents", icon: FileText },
]

const adminNav: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Employees", href: "/admin/employees", icon: Users },
  { title: "Attendance", href: "/admin/attendance", icon: CalendarClock },
  { title: "Leaves", href: "/admin/leaves", icon: PlaneTakeoff },
  { title: "Payroll", href: "/admin/payroll", icon: Banknote },
  { title: "Reports", href: "/admin/reports", icon: FileBarChart2 },
  { title: "Audit Logs", href: "/admin/audit", icon: ShieldCheck },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  
  const isAdmin = pathname?.startsWith("/admin")
  const navItems = isAdmin ? adminNav : employeeNav
  const contextName = isAdmin ? "Admin Portal" : "Employee Portal"

  return (
    <div className={cn("pb-12 border-r bg-card min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dayflow
          </h2>
          <p className="px-4 text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">
            {contextName}
          </p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname?.startsWith(item.href) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname?.startsWith(item.href) 
                    ? "font-semibold" 
                    : "font-medium text-muted-foreground"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
