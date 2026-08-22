"use client"

import * as React from "react"
import { User, MapPin, Phone, Mail, Briefcase, FileText, Banknote, Edit3, Save, X } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false)
  const [phone, setPhone] = React.useState("+1 (555) 123-4567")
  const [address, setAddress] = React.useState("123 Tech Boulevard, Suite 400, San Francisco, CA 94105")

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 sm:p-10 mb-8 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#714B67] to-[#9C27B0]"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 mt-12">
          <div className="relative">
            <div className="h-32 w-32 rounded-3xl bg-white p-2 shadow-lg">
              <div className="h-full w-full rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <User className="h-16 w-16 text-slate-400" />
              </div>
            </div>
            {isEditing && (
              <button className="absolute bottom-2 right-2 h-8 w-8 bg-blue-600 rounded-full text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors">
                <Edit3 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Jane Doe</h1>
            <p className="text-lg font-medium text-slate-500 flex items-center justify-center sm:justify-start gap-2 mt-1">
              <Briefcase className="h-5 w-5" /> Software Engineer
            </p>
          </div>
          <div className="mb-2">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-colors"
              >
                <Edit3 className="h-4 w-4" /> Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-colors"
                >
                  <X className="h-4 w-4" /> Cancel
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-colors"
                >
                  <Save className="h-4 w-4" /> Save
                </button>
              </div>
            )}
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
                  <p className="font-medium text-slate-900 mt-0.5">jane.doe@dayflow.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="w-full">
                  <p className="text-sm font-semibold text-slate-500">Phone Number</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <p className="font-medium text-slate-900 mt-0.5">{phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="w-full">
                  <p className="text-sm font-semibold text-slate-500">Address</p>
                  {isEditing ? (
                    <textarea 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
                    />
                  ) : (
                    <p className="font-medium text-slate-900 mt-0.5 leading-relaxed">{address}</p>
                  )}
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
              <Briefcase className="h-5 w-5 text-[#714B67]" /> Job Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm font-semibold text-slate-500">Employee ID</p>
                <p className="font-bold text-slate-900 mt-1">EMP-2025-042</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Department</p>
                <p className="font-bold text-slate-900 mt-1">Engineering</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Reporting Manager</p>
                <p className="font-bold text-slate-900 mt-1">Sarah Jenkins</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Date of Joining</p>
                <p className="font-bold text-slate-900 mt-1">14 March, 2023</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" /> Documents
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-slate-50/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Offer Letter.pdf</p>
                    <p className="text-xs text-slate-500 mt-0.5">Added on 14 Mar, 2023 • 2.4 MB</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-slate-50/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">ID Proof.png</p>
                    <p className="text-xs text-slate-500 mt-0.5">Added on 15 Mar, 2023 • 1.1 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
