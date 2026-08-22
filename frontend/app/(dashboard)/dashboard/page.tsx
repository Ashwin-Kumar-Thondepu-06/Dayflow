"use client"

import * as React from "react"
import Link from "next/link"
import { User, Clock, Calendar, LogOut, Bell, ChevronRight, Activity } from "lucide-react"

export default function EmployeeDashboardPage() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, Jane!</h1>
        <p className="text-lg text-slate-500 mt-2 font-medium">Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Access Cards */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#714B67]" /> Quick Access
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/profile" className="group bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 flex items-center justify-between hover:shadow-[0_10px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">My Profile</h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">View & edit details</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </Link>

            <Link href="/attendance" className="group bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 flex items-center justify-between hover:shadow-[0_10px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">Attendance</h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">Check in records</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
            </Link>

            <Link href="/time-off" className="group bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 flex items-center justify-between hover:shadow-[0_10px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-purple-600 transition-colors">Leave Requests</h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">Apply & track time-off</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-purple-600 transition-colors" />
            </Link>

            <Link href="/" className="group bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 flex items-center justify-between hover:shadow-[0_10px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <LogOut className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-600 transition-colors">Logout</h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">Sign out securely</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-red-600 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-500" /> Recent Activity
          </h2>
          
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Checked In</p>
                <p className="text-sm text-slate-500 mt-0.5">You checked in from office at 10:00 AM</p>
                <p className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wide">Today</p>
              </div>
            </div>
            <div className="p-6 border-b border-slate-100 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Leave Request Approved</p>
                <p className="text-sm text-slate-500 mt-0.5">Your sick leave request for Oct 10 was approved by Sarah Jenkins.</p>
                <p className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wide">Yesterday</p>
              </div>
            </div>
            <div className="p-6 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Profile Updated</p>
                <p className="text-sm text-slate-500 mt-0.5">You successfully updated your contact address.</p>
                <p className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wide">Last Week</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
