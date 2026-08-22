"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Hexagon, LogOut, User as UserIcon, ChevronRight, Clock } from "lucide-react"
import { AttendanceContext } from "./AttendanceContext"
import { useAuth } from "@/components/providers/AuthContext"

const NAV_LINKS = [
  { name: "Employees", href: "/employees" },
  { name: "Attendance", href: "/attendance" },
  { name: "Time Off", href: "/time-off" },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { isCheckedIn, setIsCheckedIn, checkInTime, setCheckInTime } = React.useContext(AttendanceContext)
  const { user, logout } = useAuth()
  
  const [isProfileOpen, setIsProfileOpen] = React.useState(false)
  const [isCheckInOpen, setIsCheckInOpen] = React.useState(false)
  const [now, setNow] = React.useState(new Date())

  // Update time for the check-in duration
  React.useEffect(() => {
    if (isCheckedIn) {
      const interval = setInterval(() => setNow(new Date()), 60000)
      return () => clearInterval(interval)
    }
  }, [isCheckedIn])

  const formatTimeSince = (start: Date | null) => {
    if (!start) return ""
    const diff = now.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `Since ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${hours}h ${minutes}m)`
  }
  
  // Extract initials
  const initials = user?.email ? user.email.substring(0, 2).toUpperCase() : "U"

  // Determine active state, defaulting to Employees if on root or dashboard
  const currentPath = pathname === "/" || pathname === "/dashboard" ? "/employees" : pathname

  return (
    <div className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-2xl border-b border-slate-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="flex h-16 items-center px-6 w-full">
        
        {/* Logo */}
        <Link href="/employees" className="flex items-center gap-2 mr-8 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#714B67] to-[#5a3a52] shadow-sm transition-transform group-hover:scale-105">
            <Hexagon className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900 hidden sm:block">
            Dayflow
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center h-full gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = currentPath.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#714B67]/10 text-[#714B67]"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-5 ml-auto h-full">
          
          {/* Check In / Out Systray */}
          <div className="relative flex items-center h-full">
            <button 
              onClick={() => {
                setIsCheckInOpen(!isCheckInOpen)
                setIsProfileOpen(false)
              }}
              onBlur={() => setTimeout(() => setIsCheckInOpen(false), 200)}
              className="group relative flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors"
              title="Attendance Systray"
            >
              <span className={`h-4 w-4 rounded-full shadow-sm ring-4 ring-white transition-all duration-300 ${
                isCheckedIn ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" : "bg-red-500"
              }`}></span>
            </button>

            {isCheckInOpen && (
              <div className="absolute right-0 top-14 mt-1 w-64 origin-top-right rounded-2xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 focus:outline-none overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="p-2">
                  {!isCheckedIn ? (
                    <button
                      onClick={() => {
                        setIsCheckedIn(true)
                        setCheckInTime(new Date())
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm group"
                    >
                      Check IN <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-xs font-semibold text-slate-500 bg-slate-50 rounded-xl flex items-center gap-2 border border-slate-100">
                        <Clock className="h-3.5 w-3.5 text-emerald-500" />
                        {formatTimeSince(checkInTime)}
                      </div>
                      <button
                        onClick={() => {
                          setIsCheckedIn(false)
                          setCheckInTime(null)
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all shadow-sm group"
                      >
                        Check Out <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar Dropdown */}
          <div className="relative flex items-center h-full">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen)
                setIsCheckInOpen(false)
              }}
              onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#714B67] to-[#9C27B0] text-white shadow-md ring-2 ring-white hover:scale-105 transition-transform"
            >
              <span className="font-bold text-sm drop-shadow-sm">{initials}</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-14 mt-1 w-48 origin-top-right rounded-2xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 focus:outline-none overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="p-1">
                  <div className="px-4 py-2 text-xs font-medium text-slate-500 truncate border-b border-slate-100 mb-1">
                    {user?.email}
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    <UserIcon className="h-4 w-4 text-slate-400" />
                    My Profile
                  </Link>
                  <div className="h-px bg-slate-100 my-1 mx-2" />
                  <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

