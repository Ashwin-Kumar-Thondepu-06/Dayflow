"use client"

import * as React from "react"
import { Plus, X, Upload, Calendar as CalendarIcon, Info } from "lucide-react"

export default function TimeOffPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500 relative">
      
      {/* Header & New Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Time Off</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#714B67] hover:bg-[#5a3a52] text-white px-6 py-2.5 rounded-xl font-semibold shadow-[0_4px_14px_0_rgba(113,75,103,0.39)] hover:shadow-[0_6px_20px_rgba(113,75,103,0.3)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus className="h-5 w-5" />
          NEW REQUEST
        </button>
      </div>

      {/* Leave Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Paid time Off</h2>
          <p className="text-4xl font-extrabold text-slate-900 mb-1">24</p>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Days Available</p>
        </div>
        <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-[#714B67] mb-2">Sick time off</h2>
          <p className="text-4xl font-extrabold text-slate-900 mb-1">07</p>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Days Available</p>
        </div>
      </div>

      {/* Calendar Placeholder */}
      <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-8 min-h-[400px] flex flex-col items-center justify-center text-slate-400 mb-8">
        <CalendarIcon className="h-16 w-16 mb-4 text-slate-200" />
        <p className="text-lg font-medium text-slate-500 mb-2">Calendar View</p>
        <p className="text-sm text-center max-w-md">Interactive calendar showing your approved and pending time-off requests will be displayed here.</p>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Leave Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200/60">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Type</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Date Range</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Days</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Remarks</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">Paid time off</td>
                <td className="px-6 py-4 text-slate-600 font-medium">Nov 24 - Nov 25, 2025</td>
                <td className="px-6 py-4 text-slate-600 font-medium">2</td>
                <td className="px-6 py-4 text-slate-500">Family event</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">Pending</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">Sick Leave</td>
                <td className="px-6 py-4 text-slate-600 font-medium">Oct 10, 2025</td>
                <td className="px-6 py-4 text-slate-600 font-medium">1</td>
                <td className="px-6 py-4 text-slate-500">Fever</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Approved</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">Paid time off</td>
                <td className="px-6 py-4 text-slate-600 font-medium">Aug 01 - Aug 05, 2025</td>
                <td className="px-6 py-4 text-slate-600 font-medium">5</td>
                <td className="px-6 py-4 text-slate-500">Vacation</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">Rejected</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-lg font-bold">Time off Type Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <label className="font-semibold text-slate-700">Employee</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 font-medium text-slate-900 cursor-not-allowed">
                  Jane Doe
                </div>
              </div>

              <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <label className="font-semibold text-slate-700">Time off Type</label>
                <select className="bg-white border border-slate-200 focus:ring-[#714B67]/20 focus:border-[#714B67] rounded-xl px-4 py-2.5 font-medium text-[#714B67] shadow-sm appearance-none outline-none">
                  <option>Paid time off</option>
                  <option>Sick Leave</option>
                  <option>Unpaid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <label className="font-semibold text-slate-700">Validity Period</label>
                <div className="flex items-center gap-3">
                  <input type="date" className="w-full bg-white border border-slate-200 focus:ring-[#714B67]/20 focus:border-[#714B67] rounded-xl px-3 py-2 font-medium text-slate-700 shadow-sm outline-none" />
                  <span className="text-slate-400 font-semibold text-sm">To</span>
                  <input type="date" className="w-full bg-white border border-slate-200 focus:ring-[#714B67]/20 focus:border-[#714B67] rounded-xl px-3 py-2 font-medium text-slate-700 shadow-sm outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <label className="font-semibold text-slate-700">Allocation</label>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="1.00" className="w-24 bg-white border border-slate-200 focus:ring-[#714B67]/20 focus:border-[#714B67] rounded-xl px-4 py-2 font-medium text-blue-600 shadow-sm outline-none" />
                  <span className="text-slate-600 font-medium">Days</span>
                </div>
              </div>

              <div className="grid grid-cols-[140px_1fr] items-start gap-4 pt-2">
                <label className="font-semibold text-slate-700 mt-2">Remarks</label>
                <textarea 
                  rows={2} 
                  placeholder="Reason for time off..."
                  className="w-full bg-white border border-slate-200 focus:ring-[#714B67]/20 focus:border-[#714B67] rounded-xl px-4 py-2 font-medium text-slate-700 shadow-sm outline-none resize-none" 
                />
              </div>

              <div className="grid grid-cols-[140px_1fr] items-start gap-4 pt-2">
                <label className="font-semibold text-slate-700 mt-2">Attachment</label>
                <div className="flex items-center gap-3">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                    <Upload className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-slate-500 flex items-center gap-1.5"><Info className="h-4 w-4" /> (Optional medical certificate)</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-[#9C27B0] hover:bg-[#7b1fa2] text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow transition-all duration-200"
              >
                Submit
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all duration-200"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
