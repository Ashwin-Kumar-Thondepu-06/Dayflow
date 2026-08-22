"use client"

import * as React from "react"
import { Banknote, Download, Eye, FileText } from "lucide-react"

const MOCK_PAYROLL = [
  { month: "October 2025", basic: "$5,000", allowances: "$1,200", deductions: "$800", net: "$5,400", status: "Paid" },
  { month: "September 2025", basic: "$5,000", allowances: "$1,200", deductions: "$800", net: "$5,400", status: "Paid" },
  { month: "August 2025", basic: "$5,000", allowances: "$1,200", deductions: "$800", net: "$5,400", status: "Paid" },
  { month: "July 2025", basic: "$5,000", allowances: "$1,000", deductions: "$800", net: "$5,200", status: "Paid" },
]

export default function PayrollPage() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Payroll</h1>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-colors">
          <Download className="h-4 w-4" /> Download YTD Statement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Current CTC</h2>
          <p className="text-3xl font-extrabold text-slate-900">$84,000<span className="text-lg font-medium text-slate-400">/yr</span></p>
        </div>
        <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Last Payout</h2>
          <p className="text-3xl font-extrabold text-emerald-600">$5,400</p>
          <p className="text-xs font-semibold text-slate-400 mt-1">For October 2025</p>
        </div>
        <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Next Payout Date</h2>
          <p className="text-3xl font-extrabold text-slate-900">30 Nov</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#714B67]" />
          <h2 className="text-lg font-bold text-slate-900">Payslip History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200/60">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Month</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Basic Pay</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Allowances</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Deductions</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Net Pay</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider text-center">Status</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PAYROLL.map((record, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{record.month}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.basic}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.allowances}</td>
                  <td className="px-6 py-4 text-red-500 font-medium">-{record.deductions}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">{record.net}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-[#714B67] hover:bg-[#714B67]/10 rounded-lg transition-colors" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
