"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"

const MOCK_ATTENDANCE = [
  { date: "28/10/2025", checkIn: "10:00", checkOut: "19:00", workHours: "09:00", extraHours: "01:00" },
  { date: "29/10/2025", checkIn: "10:00", checkOut: "19:00", workHours: "09:00", extraHours: "01:00" },
  { date: "30/10/2025", checkIn: "09:30", checkOut: "18:30", workHours: "09:00", extraHours: "01:00" },
  { date: "31/10/2025", checkIn: "10:15", checkOut: "19:15", workHours: "09:00", extraHours: "01:00" },
]

export default function AttendancePage() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Attendance</h1>

      {/* Top Controls & Stats */}
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Month Selector */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
            <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600 hover:text-slate-900 shadow-sm">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="px-4 font-semibold text-slate-800 flex items-center gap-2 min-w-[120px] justify-center">
              <CalendarIcon className="h-4 w-4 text-[#714B67]" />
              October 2025
            </div>
            <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600 hover:text-slate-900 shadow-sm">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-3 text-center">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Days Present</p>
              <p className="text-2xl font-extrabold text-emerald-900">22</p>
            </div>
            <div className="flex-1 md:flex-none bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 text-center">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Leaves Count</p>
              <p className="text-2xl font-extrabold text-blue-900">02</p>
            </div>
            <div className="flex-1 md:flex-none bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-center">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Working Days</p>
              <p className="text-2xl font-extrabold text-slate-900">24</p>
            </div>
          </div>

        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200/60">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Date</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Check In</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Check Out</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Work Hours</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Extra Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ATTENDANCE.map((record, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{record.date}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                      {record.checkIn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                      {record.checkOut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.workHours}</td>
                  <td className="px-6 py-4 text-[#714B67] font-semibold">{record.extraHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
