"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Settings, ChevronLeft, ChevronRight, LayoutGrid, List, Network, Activity, BarChart2, Table, Briefcase, Mail, Phone, ChevronDown, Clock3, Users, PanelLeftClose, PanelLeftOpen, User, Plane, X } from "lucide-react"
import { AttendanceContext } from "@/components/dashboard/AttendanceContext"
import { useAuth } from "@/components/providers/AuthContext"
import { fetchApi } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

const INITIAL_EMPLOYEES = [
  { 
    id: "1", 
    name: "Emma Granger", 
    role: "Consultant", 
    email: "granger@mycompany.example.com",
    phone: "(555)-768-6230",
    tags: [{ text: "Consultant", color: "bg-blue-100/80 text-blue-700" }, { text: "Demo", color: "bg-orange-100/80 text-orange-700" }],
    status: "absent" 
  },
  { 
    id: "2", 
    name: "Michael Williams", 
    role: "Chief Executive Officer", 
    email: "williams@mycompany.example.com",
    phone: "(555)-768-6230",
    tags: [{ text: "Employee", color: "bg-orange-50/80 text-orange-700" }, { text: "Demo", color: "bg-orange-100/80 text-orange-700" }],
    status: "leave" 
  },
  { 
    id: "3", 
    name: "Simon Jones", 
    role: "Experienced Developer", 
    email: "jones@mycompany.example.com",
    phone: "(555)-768-6230",
    tags: [{ text: "Employee", color: "bg-orange-50/80 text-orange-700" }, { text: "Demo", color: "bg-orange-100/80 text-orange-700" }],
    status: "present" 
  },
]

export default function EmployeesPage() {
  const [employees, setEmployees] = React.useState(INITIAL_EMPLOYEES)
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(false)
  const [activeDepartment, setActiveDepartment] = React.useState("All")
  const [viewMode, setViewMode] = React.useState<'kanban' | 'list'>('kanban')
  
  // Admin & Modal State
  const { user } = useAuth()
  const { toast } = useToast()
  const isAdmin = user?.role === 'COMPANY' || user?.role === 'ADMIN'
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = React.useState(false)
  
  const { isCheckedIn } = React.useContext(AttendanceContext)

  // Function to render the correct status indicator based on wireframe legend
  const renderStatus = (status: string, isCurrentUser: boolean = false) => {
    // If it's the current user (Emma), override status based on Context
    const effectiveStatus = isCurrentUser ? (isCheckedIn ? "present" : "absent") : status

    if (effectiveStatus === "present") {
      return <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] border border-white" title="Present"></div>
    } else if (effectiveStatus === "leave") {
      return <div title="On Leave" className="flex items-center justify-center"><Plane className="h-4 w-4 text-blue-500 drop-shadow-sm" /></div>
    } else {
      // Absent (Yellow Dot)
      return <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-sm border border-white" title="Absent"></div>
    }
  }

  const renderStatusText = (status: string, isCurrentUser: boolean = false) => {
    const effectiveStatus = isCurrentUser ? (isCheckedIn ? "present" : "absent") : status
    if (effectiveStatus === "present") return "Present"
    if (effectiveStatus === "leave") return "On Leave"
    return "Absent"
  }

  const handleCreateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      // In a real scenario you would parse this data according to your backend DTO
      const payload = {
        firstName: (formData.get("name") as string).split(' ')[0],
        lastName: (formData.get("name") as string).split(' ').slice(1).join(' ') || ' ',
        email: formData.get("email") as string,
        mobileNumber: formData.get("phone") as string,
        jobPosition: formData.get("role") as string,
      }

      // We wrap it in a try catch to call the real API, but for now we fallback to pushing to state if the backend isn't ready
      let newEmp: any;
      try {
        const response = await fetchApi('/employees', {
          method: 'POST',
          body: JSON.stringify(payload)
        })
        newEmp = {
          id: response.data.id || Math.random().toString(),
          name: formData.get("name") as string,
          role: formData.get("role") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          tags: [{ text: "Employee", color: "bg-emerald-50 text-emerald-700" }],
          status: "present"
        }
        toast({ title: "Success", description: "Employee created successfully." })
      } catch (apiError) {
        console.error("API failed, using local fallback", apiError)
        newEmp = {
          id: Math.random().toString(),
          name: formData.get("name") as string,
          role: formData.get("role") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          tags: [{ text: "Employee", color: "bg-emerald-50 text-emerald-700" }],
          status: "present"
        }
        toast({ title: "Success (Local Fallback)", description: "Employee added to UI." })
      }
      
      setEmployees([...employees, newEmp])
      setIsNewEmployeeModalOpen(false)
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not create employee." })
    }
  }

  return (
    <>
      <div className="flex h-[calc(100vh-56px)] overflow-hidden animate-in fade-in duration-300 relative">
        
        {/* Premium Background Mesh Gradient (Matches Login Style) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/50 via-slate-50 to-emerald-50/30 -z-10" />

        {/* Sidebar */}
        <div className={`transition-all duration-300 ease-in-out shrink-0 border-r border-slate-200/60 bg-white/60 backdrop-blur-xl ${
          isSidebarExpanded ? 'w-64' : 'w-14'
        }`}>
          {/* Toggle Button */}
          <div className="flex items-center justify-end p-3 border-b border-slate-200/40">
            <button 
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors shadow-sm bg-white"
            >
              {isSidebarExpanded ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
            </button>
          </div>

          {/* Sidebar Content */}
          {isSidebarExpanded ? (
            <div className="py-4">
              <div className="px-4 mb-2 flex items-center gap-2 text-slate-700 font-extrabold text-sm tracking-widest uppercase">
                <Users className="h-4 w-4 text-[#714B67]" /> Department
              </div>
              <div className="space-y-1 px-2 mt-4">
                <button 
                  onClick={() => setActiveDepartment("All")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                    activeDepartment === "All" ? "bg-emerald-50 text-emerald-800 font-bold shadow-sm" : "text-slate-600 hover:bg-slate-100 font-medium"
                  }`}
                >
                  <span>All</span>
                </button>
                <button 
                  onClick={() => setActiveDepartment("Administration")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                    activeDepartment === "Administration" ? "bg-emerald-50 text-emerald-800 font-bold shadow-sm" : "text-slate-600 hover:bg-slate-100 font-medium"
                  }`}
                >
                  <span>Administration</span>
                  <span className="text-xs font-semibold text-slate-400">1</span>
                </button>
                <button 
                  onClick={() => setActiveDepartment("Research & Development")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                    activeDepartment === "Research & Development" ? "bg-emerald-50 text-emerald-800 font-bold shadow-sm" : "text-slate-600 hover:bg-slate-100 font-medium"
                  }`}
                >
                  <span>Research & Development</span>
                  <span className="text-xs font-semibold text-slate-400">2</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-4 flex flex-col items-center">
              <div className="flex items-center justify-center p-2 rounded-xl bg-emerald-50 text-emerald-700 mb-2 cursor-pointer shadow-sm">
                <Users className="h-5 w-5" />
              </div>
              <div className="vertical-text text-xs font-bold text-slate-500 mt-6 tracking-widest uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                Departments
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Control Bar (Premium Styling) */}
          <div className="h-16 border-b border-slate-200/60 bg-white/60 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
            
            <div className="flex items-center gap-6">
              {isAdmin && (
                <button 
                  onClick={() => setIsNewEmployeeModalOpen(true)}
                  className="bg-gradient-to-br from-[#714B67] to-[#5a3a52] hover:opacity-90 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-[0_4px_14px_0_rgba(113,75,103,0.39)] hover:shadow-[0_6px_20px_rgba(113,75,103,0.3)] hover:-translate-y-0.5"
                >
                  New
                </button>
              )}
              <div className="flex items-center gap-2 text-slate-800">
                <span className="text-xl font-bold tracking-tight">Employees</span>
                <button className="p-1.5 hover:bg-slate-200/50 rounded-lg transition-colors"><Settings className="h-4 w-4 text-slate-400" /></button>
              </div>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative flex items-center shadow-sm rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-10 py-2 border border-slate-200/80 rounded-xl bg-white/80 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#714B67]/20 focus:border-[#714B67] text-sm font-medium transition-colors"
                  placeholder="Search..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center text-sm font-medium text-slate-600 gap-3">
                <span>1-{employees.length} / {employees.length}</span>
                <div className="flex items-center gap-1 bg-white border border-slate-200/60 rounded-lg p-0.5 shadow-sm">
                  <button className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"><ChevronLeft className="h-4 w-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>

              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 p-1 shadow-sm">
                <button 
                  onClick={() => setViewMode('kanban')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'kanban' ? 'bg-slate-100/80 shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'}`} 
                  title="Kanban"
                ><LayoutGrid className="h-4 w-4" /></button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-slate-100/80 shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'}`} 
                  title="List"
                ><List className="h-4 w-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors" title="Hierarchy"><Network className="h-4 w-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors" title="Activity"><Activity className="h-4 w-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors" title="Graph"><BarChart2 className="h-4 w-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors" title="Pivot"><Table className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {/* Employee Content Area */}
          <div className="flex-1 overflow-auto p-6 lg:p-8">
            {viewMode === 'kanban' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee) => (
                  <Link 
                    key={employee.id} 
                    href={`/profile/${employee.id}`}
                    className="group flex bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 rounded-[1.5rem] overflow-hidden hover:-translate-y-1 relative"
                  >
                    {/* Profile Image Placeholder (Left Side) */}
                    <div className="w-28 shrink-0 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border-r border-slate-100/60 group-hover:bg-slate-100 transition-colors">
                      <User className="h-10 w-10 text-slate-300" />
                    </div>

                    {/* Details (Right Side) */}
                    <div className="flex-1 p-4 pl-5 relative bg-white/50">
                      {/* Status Indicator */}
                      <div className="absolute top-3 right-3">
                        {renderStatus(employee.status, employee.id === "1")}
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-[16px] mb-2 truncate pr-6 group-hover:text-[#714B67] transition-colors">{employee.name}</h3>
                      
                      <div className="space-y-1.5 mb-3">
                        <p className="text-[13px] font-medium text-slate-600 flex items-center gap-2 truncate">
                          <Briefcase className="h-4 w-4 text-[#714B67]/70" /> {employee.role}
                        </p>
                        <p className="text-[13px] font-medium text-slate-600 flex items-center gap-2 truncate">
                          <Mail className="h-4 w-4 text-[#714B67]/70" /> {employee.email}
                        </p>
                        <p className="text-[13px] font-medium text-slate-600 flex items-center gap-2 truncate">
                          <Phone className="h-4 w-4 text-[#714B67]/70" /> {employee.phone}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {employee.tags.map((tag, i) => (
                          <span key={i} className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${tag.color}`}>
                            {tag.text}
                          </span>
                        ))}
                      </div>

                      {/* Clock Icon */}
                      <div className="absolute bottom-3 right-3">
                        <Clock3 className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[1.5rem] overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200/60">
                    <tr>
                      <th className="px-6 py-4 font-bold">Employee Name</th>
                      <th className="px-6 py-4 font-bold">Role</th>
                      <th className="px-6 py-4 font-bold">Email</th>
                      <th className="px-6 py-4 font-bold">Phone</th>
                      <th className="px-6 py-4 font-bold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => window.location.href = `/profile/${employee.id}`}>
                        <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            <User className="h-4 w-4 text-slate-400" />
                          </div>
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-600">{employee.role}</td>
                        <td className="px-6 py-4 font-medium text-slate-600">{employee.email}</td>
                        <td className="px-6 py-4 font-medium text-slate-600">{employee.phone}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                            {renderStatusText(employee.status, employee.id === "1")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Employee Modal */}
      {isNewEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200/60 scale-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">Add New Employee</h2>
              <button 
                onClick={() => setIsNewEmployeeModalOpen(false)}
                className="p-2 hover:bg-slate-200/50 rounded-full transition-colors text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateEmployee} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input required name="name" type="text" placeholder="e.g. John Doe" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714B67]/20 focus:border-[#714B67] transition-all" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input required name="email" type="email" placeholder="john@company.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714B67]/20 focus:border-[#714B67] transition-all" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input required name="phone" type="text" placeholder="(555) 123-4567" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714B67]/20 focus:border-[#714B67] transition-all" />
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-bold text-slate-700">Job Role</label>
                  <input required name="role" type="text" placeholder="e.g. Senior Designer" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714B67]/20 focus:border-[#714B67] transition-all" />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsNewEmployeeModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-gradient-to-br from-[#714B67] to-[#5a3a52] hover:opacity-90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_4px_14px_0_rgba(113,75,103,0.39)] hover:shadow-[0_6px_20px_rgba(113,75,103,0.3)] hover:-translate-y-0.5"
                >
                  Create Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
