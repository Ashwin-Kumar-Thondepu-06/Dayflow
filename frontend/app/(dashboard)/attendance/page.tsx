"use client"

import * as React from "react"
import { Search, ChevronLeft, ChevronRight, Calendar, User, Clock, FileText, CalendarDays, Filter } from "lucide-react"
import { useAuth } from "@/components/providers/AuthContext"
import { fetchApi } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function AttendancePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const isAdmin = user?.role === 'COMPANY' || user?.role === 'ADMIN'

  // Global State
  const [attendanceData, setAttendanceData] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Admin State
  const [searchQuery, setSearchQuery] = React.useState("")
  const [currentDate, setCurrentDate] = React.useState(new Date()) // Today
  
  // Employee State
  const [currentMonth, setCurrentMonth] = React.useState(new Date()) // Current Month
  
  // Handlers for Date/Month navigation
  const prevDate = () => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))
  const nextDate = () => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))
  
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))

  const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const formattedMonth = currentMonth.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })

  React.useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true)
      try {
        if (isAdmin) {
          // Admin View: Fetch daily roster
          const dateStr = currentDate.toISOString()
          const response = await fetchApi(`/attendance?date=${dateStr}`)
          setAttendanceData(response.data || [])
        } else {
          // Employee View: Fetch monthly roster
          const year = currentMonth.getFullYear()
          const month = currentMonth.getMonth() + 1
          const response = await fetchApi(`/attendance/me?year=${year}&month=${month}`)
          setAttendanceData(response.data || [])
        }
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to load attendance records." })
      } finally {
        setIsLoading(false)
      }
    }
    
    // Only fetch if we know the user role
    if (user) {
      fetchAttendance()
    }
  }, [user, isAdmin, currentDate, currentMonth, toast])

  // Helpers to format time
  const formatTime = (isoString: string | null) => {
    if (!isoString) return '--:--'
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  const formatHours = (minutes: number) => {
    if (!minutes) return '00:00'
    const h = Math.floor(minutes / 60).toString().padStart(2, '0')
    const m = (minutes % 60).toString().padStart(2, '0')
    return `${h}:${m}`
  }

  // Employee Derived Stats
  const daysPresent = attendanceData.filter(d => d.status === "PRESENT").length
  const leavesCount = attendanceData.filter(d => d.status === "LEAVE").length
  const totalWorkingDays = 22 // Mock constant for the month

  // Filter Admin Data
  const filteredAdminData = attendanceData.filter(emp => 
    (emp.employeeName || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50/50 p-6 lg:p-8 animate-in fade-in duration-300">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-slate-50 to-teal-50/20 -z-10" />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#714B67] to-[#9C27B0] flex items-center justify-center text-white shadow-md">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Attendance</h1>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                {isAdmin ? "Track employee daily attendance" : "View your monthly attendance records"}
              </p>
            </div>
          </div>

          {/* Admin Search Bar */}
          {isAdmin && (
            <div className="relative w-full max-w-sm hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#714B67]/20 focus:border-[#714B67] text-sm font-semibold transition-all shadow-sm"
                placeholder="Search employees..."
              />
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden relative">
          
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-[#714B67] rounded-full animate-spin"></div>
            </div>
          )}

          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30">
            
            {/* Date/Month Navigation */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                <button onClick={isAdmin ? prevDate : prevMonth} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="px-4 py-1.5 font-bold text-slate-700 text-sm border-x border-slate-100 flex items-center gap-2 min-w-[140px] justify-center">
                  <Calendar className="h-4 w-4 text-[#714B67]" />
                  {isAdmin ? formattedDate : formattedMonth}
                </div>
                <button onClick={isAdmin ? nextDate : nextMonth} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Day / Date Selector Button (Decorative per wireframe) */}
              <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-bold transition-colors text-sm shadow-sm">
                <CalendarDays className="h-4 w-4" /> {isAdmin ? "Day" : "Date"}
              </button>
            </div>

            {/* Employee Summary Blocks */}
            {!isAdmin && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                <div className="flex flex-col bg-teal-50 border border-teal-100 px-4 py-2 rounded-xl min-w-[120px]">
                  <span className="text-[10px] font-extrabold text-teal-800 uppercase tracking-wider">Days Present</span>
                  <span className="text-lg font-black text-teal-700">{daysPresent}</span>
                </div>
                <div className="flex flex-col bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl min-w-[120px]">
                  <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">Leaves Count</span>
                  <span className="text-lg font-black text-amber-700">{leavesCount}</span>
                </div>
                <div className="flex flex-col bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl min-w-[120px]">
                  <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">Total Working</span>
                  <span className="text-lg font-black text-slate-800">{totalWorkingDays}</span>
                </div>
              </div>
            )}
            
            {/* Admin Filter Decor */}
            {isAdmin && (
              <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-bold transition-colors text-sm shadow-sm ml-auto">
                <Filter className="h-4 w-4" /> Filter
              </button>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase tracking-wider bg-slate-50/80 border-b border-slate-200/60">
                <tr>
                  <th className="px-6 py-4 font-extrabold">{isAdmin ? "Employee" : "Date"}</th>
                  <th className="px-6 py-4 font-extrabold">Check In</th>
                  <th className="px-6 py-4 font-extrabold">Check Out</th>
                  <th className="px-6 py-4 font-extrabold">Work Hours</th>
                  <th className="px-6 py-4 font-extrabold text-right">Extra Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isAdmin ? (
                  // ADMIN VIEW: List of employees for a specific date
                  filteredAdminData.length > 0 ? (
                    filteredAdminData.map((record) => (
                      <tr key={record.employeeId} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                              <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <span className="font-bold text-slate-900 group-hover:text-[#714B67] transition-colors">{record.employeeName}</span>
                            {record.status === 'LEAVE' && (
                              <span className="ml-2 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Leave</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-600">{formatTime(record.checkIn)}</td>
                        <td className="px-6 py-4 font-semibold text-slate-600">{formatTime(record.checkOut)}</td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{formatHours(record.workMinutes)}</td>
                        <td className="px-6 py-4 font-bold text-teal-600 text-right">{formatHours(record.overtimeMinutes)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                        No employees found matching your search.
                      </td>
                    </tr>
                  )
                ) : (
                  // EMPLOYEE VIEW: List of dates for a specific month
                  attendanceData.length > 0 ? (
                    attendanceData.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-900">{new Date(record.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            {record.status === 'LEAVE' && (
                              <span className="ml-2 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Leave</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-600">{formatTime(record.checkIn)}</td>
                        <td className="px-6 py-4 font-semibold text-slate-600">{formatTime(record.checkOut)}</td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{formatHours(record.workMinutes)}</td>
                        <td className="px-6 py-4 font-bold text-teal-600 text-right">{formatHours(record.overtimeMinutes)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                        No attendance records found for this month.
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
