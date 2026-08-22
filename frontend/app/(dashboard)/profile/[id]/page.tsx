"use client"

import * as React from "react"
import { User, MapPin, Phone, Mail, Briefcase, FileText, Banknote } from "lucide-react"

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  // Using static data since backend is not connected
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 sm:p-10 mb-8 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 mt-12">
          <div className="relative">
            <div className="h-32 w-32 rounded-3xl bg-white p-2 shadow-lg">
              <div className="h-full w-full rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <User className="h-16 w-16 text-slate-400" />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">John Smith</h1>
            <p className="text-lg font-medium text-slate-500 flex items-center justify-center sm:justify-start gap-2 mt-1">
              <Briefcase className="h-5 w-5" /> Product Manager
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          {/* Contact Info */}
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Contact Information</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Email Address</p>
                  <p className="font-medium text-slate-900 mt-0.5">john.smith@dayflow.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="w-full">
                  <p className="text-sm font-semibold text-slate-500">Phone Number</p>
                  <p className="font-medium text-slate-900 mt-0.5">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="w-full">
                  <p className="text-sm font-semibold text-slate-500">Address</p>
                  <p className="font-medium text-slate-900 mt-0.5 leading-relaxed">456 Innovation Way, Austin, TX 78701</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Details */}
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600" /> Job Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm font-semibold text-slate-500">Employee ID</p>
                <p className="font-bold text-slate-900 mt-1">EMP-2022-019</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Department</p>
                <p className="font-bold text-slate-900 mt-1">Product</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Reporting Manager</p>
                <p className="font-bold text-slate-900 mt-1">David Lee</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Date of Joining</p>
                <p className="font-bold text-slate-900 mt-1">10 August, 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
