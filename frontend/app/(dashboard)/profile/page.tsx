"use client"

import * as React from "react"
import { User, MapPin, Phone, Mail, Briefcase, FileText, Banknote, Edit3, Save, X, Shield, Lock, CreditCard } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('Private Info')

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/60 p-8 mb-8 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#714B67] to-[#9C27B0]"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row gap-10 mt-12">
          {/* Avatar Section */}
          <div className="relative shrink-0">
            <div className="h-40 w-40 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg relative group">
              <User className="h-20 w-20 text-slate-300" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Edit3 className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 right-2 h-6 w-6 rounded-full bg-emerald-500 ring-4 ring-white shadow-sm"></div>
          </div>

          {/* Form / Info Section */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Profile</h1>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2 rounded-xl font-bold transition-colors text-sm"
                >
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-xl font-bold transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 bg-[#714B67] hover:bg-[#5a3a52] text-white px-5 py-2 rounded-xl font-bold transition-colors text-sm"
                  >
                    <Save className="h-4 w-4" /> Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">My Name</label>
                  {isEditing ? (
                    <input type="text" defaultValue="Emma Granger" className="w-full font-bold text-slate-900 focus:outline-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200" />
                  ) : (
                    <div className="font-bold text-slate-900 text-lg">Emma Granger</div>
                  )}
                </div>
                <div className="border-b border-slate-200 pb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Job Position</label>
                  {isEditing ? (
                    <input type="text" defaultValue="Consultant" className="w-full font-bold text-slate-900 focus:outline-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200" />
                  ) : (
                    <div className="font-bold text-slate-700">Consultant</div>
                  )}
                </div>
                <div className="border-b border-slate-200 pb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Email</label>
                  {isEditing ? (
                    <input type="email" defaultValue="granger@mycompany.example.com" className="w-full font-bold text-slate-900 focus:outline-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200" />
                  ) : (
                    <div className="font-bold text-slate-700">granger@mycompany.example.com</div>
                  )}
                </div>
                <div className="border-b border-slate-200 pb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Mobile</label>
                  {isEditing ? (
                    <input type="text" defaultValue="(555)-768-6230" className="w-full font-bold text-slate-900 focus:outline-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200" />
                  ) : (
                    <div className="font-bold text-slate-700">(555)-768-6230</div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Company</label>
                  {isEditing ? (
                    <input type="text" defaultValue="Dayflow" className="w-full font-bold text-slate-900 focus:outline-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200" />
                  ) : (
                    <div className="font-bold text-slate-700">Dayflow</div>
                  )}
                </div>
                <div className="border-b border-slate-200 pb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Department</label>
                  {isEditing ? (
                    <input type="text" defaultValue="Research & Development" className="w-full font-bold text-slate-900 focus:outline-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200" />
                  ) : (
                    <div className="font-bold text-slate-700">Research & Development</div>
                  )}
                </div>
                <div className="border-b border-slate-200 pb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Manager</label>
                  {isEditing ? (
                    <input type="text" defaultValue="Michael Williams" className="w-full font-bold text-slate-900 focus:outline-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200" />
                  ) : (
                    <div className="font-bold text-slate-700">Michael Williams</div>
                  )}
                </div>
                <div className="border-b border-slate-200 pb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Location</label>
                  {isEditing ? (
                    <input type="text" defaultValue="Remote - India" className="w-full font-bold text-slate-900 focus:outline-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200" />
                  ) : (
                    <div className="font-bold text-slate-700">Remote - India</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto hide-scrollbar">
        {['Resume', 'Private Info', 'Salary Info', 'Security'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'text-[#714B67] border-[#714B67]' 
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-300">
        
        {activeTab === 'Private Info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Column: Personal Info */}
            <div className="space-y-6 bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-teal-600" /> Personal Information
              </h2>
              
              <div className="space-y-5">
                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">Date of Birth</label>
                  <div className="col-span-2">
                    {isEditing ? <input type="date" defaultValue="1995-05-15" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" /> : <span className="text-sm font-bold text-slate-800">15 May 1995</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-start border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500 pt-2">Residing Address</label>
                  <div className="col-span-2">
                    {isEditing ? <textarea rows={2} defaultValue="123 Tech Lane, Silicon Valley" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" /> : <span className="text-sm font-bold text-slate-800">123 Tech Lane, Silicon Valley</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">Nationality</label>
                  <div className="col-span-2">
                    {isEditing ? <input type="text" defaultValue="Indian" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" /> : <span className="text-sm font-bold text-slate-800">Indian</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">Personal Email</label>
                  <div className="col-span-2">
                    {isEditing ? <input type="email" defaultValue="emma.g@personal.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" /> : <span className="text-sm font-bold text-slate-800">emma.g@personal.com</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">Gender</label>
                  <div className="col-span-2">
                    {isEditing ? (
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500">
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    ) : <span className="text-sm font-bold text-slate-800">Female</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">Marital Status</label>
                  <div className="col-span-2">
                    {isEditing ? (
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500">
                        <option>Single</option>
                        <option>Married</option>
                      </select>
                    ) : <span className="text-sm font-bold text-slate-800">Single</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center pt-2">
                  <label className="text-sm font-semibold text-slate-500">Date of Joining</label>
                  <div className="col-span-2">
                    {isEditing ? <input type="date" defaultValue="2023-08-10" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" /> : <span className="text-sm font-bold text-slate-800">10 Aug 2023</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bank Details */}
            <div className="space-y-6 bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pb-4 border-b border-slate-200">
                <CreditCard className="h-5 w-5 text-indigo-600" /> Bank Details
              </h2>
              
              <div className="space-y-5">
                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">Account Number</label>
                  <div className="col-span-2">
                    {isEditing ? <input type="text" defaultValue="**** **** 4321" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" /> : <span className="text-sm font-bold text-slate-800 font-mono tracking-wider">**** **** 4321</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">Bank Name</label>
                  <div className="col-span-2">
                    {isEditing ? <input type="text" defaultValue="HDFC Bank" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" /> : <span className="text-sm font-bold text-slate-800">HDFC Bank</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">IFSC Code</label>
                  <div className="col-span-2">
                    {isEditing ? <input type="text" defaultValue="HDFC0001234" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" /> : <span className="text-sm font-bold text-slate-800 uppercase">HDFC0001234</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">PAN No</label>
                  <div className="col-span-2">
                    {isEditing ? <input type="text" defaultValue="ABCDE1234F" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" /> : <span className="text-sm font-bold text-slate-800 uppercase">ABCDE1234F</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center border-b border-slate-100 pb-3">
                  <label className="text-sm font-semibold text-slate-500">UAN NO</label>
                  <div className="col-span-2">
                    {isEditing ? <input type="text" defaultValue="100987654321" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" /> : <span className="text-sm font-bold text-slate-800">100987654321</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center pt-2">
                  <label className="text-sm font-semibold text-slate-500">Emp Code</label>
                  <div className="col-span-2">
                    <span className="text-sm font-bold text-slate-800 uppercase bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">EMP-2023-014</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        )}

        {activeTab === 'Resume' && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200/60 shadow-sm">
            <FileText className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">My Resume</h3>
            <p className="text-slate-500 mb-6">You haven't uploaded a resume yet.</p>
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors">
              Upload Resume
            </button>
          </div>
        )}

        {activeTab === 'Salary Info' && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200/60 shadow-sm">
            <Banknote className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Salary Information</h3>
            <p className="text-slate-500 max-w-md mx-auto">Your detailed salary breakdown and payslips will appear here once generated by HR.</p>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200/60 shadow-sm">
            <Shield className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Security Settings</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">Manage your password and two-factor authentication settings.</p>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors border border-slate-200">
              Change Password
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
