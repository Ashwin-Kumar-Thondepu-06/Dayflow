"use client"

import * as React from "react"
import { User, MapPin, Phone, Mail, Briefcase, Network, Smartphone, Edit2, Info, FileText, Settings, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react"
import { useAuth } from "@/components/providers/AuthContext"

// --- DYNAMIC ORG CHART COMPONENTS ---
type OrgNodeData = {
  id: string
  name: string
  role: string
  isRoot?: boolean
  children?: OrgNodeData[]
}

const ORG_DATA: OrgNodeData = {
  id: "1",
  name: "Michael Williams",
  role: "Chief Executive Officer",
  isRoot: true,
  children: [
    {
      id: "2",
      name: "Emma Granger",
      role: "Consultant",
      children: [
        {
          id: "3",
          name: "John Doe",
          role: "Junior Analyst",
        }
      ]
    },
    {
      id: "4",
      name: "Sarah Jenkins",
      role: "VP of Operations",
    }
  ]
}

const OrgChartNode = ({ node, isLast, level = 0 }: { node: OrgNodeData, isLast?: boolean, level?: number }) => {
  const hasChildren = node.children && node.children.length > 0
  const [expanded, setExpanded] = React.useState(true)

  return (
    <div className="relative">
      {/* Connector Line from Parent */}
      {!node.isRoot && (
        <>
          <div className="absolute left-[-24px] top-[-30px] bottom-0 w-px bg-slate-300" style={{ bottom: isLast ? 'calc(100% - 24px)' : '0' }}></div>
          <div className="absolute left-[-24px] top-[24px] w-[24px] h-px bg-slate-300"></div>
        </>
      )}

      {/* Node Content */}
      <div className="flex items-start gap-4 pt-6 group relative">
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center border-2 shrink-0 z-10 shadow-sm relative overflow-hidden transition-transform hover:scale-105 ${
          node.isRoot ? "bg-slate-100 border-slate-200" : "bg-slate-800 border-teal-500"
        }`}>
          {!node.isRoot && <div className="absolute inset-0 bg-gradient-to-tr from-slate-700 to-slate-900 opacity-50"></div>}
          <User className={`h-6 w-6 relative z-10 ${node.isRoot ? 'text-slate-400' : 'text-slate-300'}`} />
        </div>
        
        <div className="pt-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-[15px] font-bold cursor-pointer transition-colors ${node.isRoot ? 'text-teal-600 hover:underline' : 'text-slate-800 hover:text-teal-600'}`}>
              {node.name}
            </h4>
            {hasChildren && (
              <button onClick={() => setExpanded(!expanded)} className="p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
          <p className="text-xs font-medium text-slate-500">{node.role}</p>
        </div>
      </div>

      {/* Children Container */}
      {hasChildren && expanded && (
        <div className="relative pl-[24px] ml-6">
          {node.children!.map((child, index) => (
            <OrgChartNode 
              key={child.id} 
              node={child} 
              isLast={index === node.children!.length - 1} 
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}


export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'COMPANY' || user?.role === 'ADMIN'
  const [activeTab, setActiveTab] = React.useState('Work')

  // Salary Calculator State
  const [monthWage, setMonthWage] = React.useState<number>(50000)
  const yearlyWage = monthWage * 12
  
  // Formulas based on wireframe logic
  const basic = monthWage * 0.5
  const hra = basic * 0.5
  const standardAllowance = monthWage * 0.1667
  const performanceBonus = monthWage * 0.0833
  const leaveTravel = monthWage * 0.0833
  const fixedAllowance = monthWage - (basic + hra + standardAllowance + performanceBonus + leaveTravel)
  
  const pf = basic * 0.12
  const tax = 200 // Fixed professional tax
  const totalDeductions = pf + tax
  const netPay = monthWage - totalDeductions

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 overflow-hidden mb-6">
          
          {/* Header Section */}
          <div className="p-8 flex flex-col md:flex-row gap-8 items-start relative">
            
            {isAdmin && (
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200">
                <ShieldCheck className="h-4 w-4" /> Admin View
              </div>
            )}

            {/* Profile Image Placeholder */}
            <div className="relative shrink-0">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative group">
                <User className="h-16 w-16 text-slate-300" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Edit2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-emerald-500 ring-4 ring-white shadow-sm"></div>
            </div>

            {/* Header Details */}
            <div className="flex-1 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Emma Granger</h1>
                <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-md border border-emerald-200">Active</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-y-4 gap-x-8">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[15px]">
                    <Briefcase className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700 font-medium">Consultant</span>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <a href="mailto:granger@mycompany.example.com" className="text-teal-600 hover:underline font-medium">granger@mycompany.example.com</a>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[15px]">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700 font-medium">(555)-768-6230</span>
                    <div className="flex items-center gap-2 ml-1 text-xs font-bold text-teal-600">
                      <button className="flex items-center gap-1 hover:underline"><Phone className="h-3 w-3" /> Call</button>
                      <button className="flex items-center gap-1 hover:underline"><Smartphone className="h-3 w-3" /> SMS</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[15px]">
                    <Smartphone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700 font-medium">(555)-768-6235</span>
                    <div className="flex items-center gap-2 ml-1 text-xs font-bold text-teal-600">
                      <button className="flex items-center gap-1 hover:underline"><Phone className="h-3 w-3" /> Call</button>
                      <button className="flex items-center gap-1 hover:underline"><Smartphone className="h-3 w-3" /> SMS</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-8 border-b border-slate-200 flex gap-2 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('Work')}
              className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'Work' 
                  ? 'text-teal-700 border-teal-600' 
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Work
            </button>
            <button 
              onClick={() => setActiveTab('Private Info')}
              className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'Private Info' 
                  ? 'text-teal-700 border-teal-600' 
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Private Info
            </button>
            
            {isAdmin && (
              <button 
                onClick={() => setActiveTab('Salary Info')}
                className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'Salary Info' 
                    ? 'text-teal-700 border-teal-600 bg-teal-50/50 rounded-t-lg' 
                    : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <ShieldCheck className="h-4 w-4" /> Salary Info
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            
            {/* WORK TAB */}
            {activeTab === 'Work' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 animate-in fade-in duration-300">
                
                {/* Left Column: Work & Location */}
                <div className="space-y-10">
                  {/* WORK Section */}
                  <div>
                    <h2 className="text-xs font-black text-slate-800 tracking-wider mb-6 pb-2 border-b border-slate-100 uppercase">Work Details</h2>
                    <div className="grid grid-cols-[140px_1fr] gap-y-5 items-center">
                      <span className="text-sm font-semibold text-slate-500">Department</span>
                      <span className="text-[15px] font-bold text-teal-700 hover:underline cursor-pointer">Research & Development</span>
                      
                      <span className="text-sm font-semibold text-slate-500">Job Title</span>
                      <span className="text-[15px] font-medium text-slate-800">Consultant</span>
                      
                      <span className="text-sm font-semibold text-slate-500">Manager</span>
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                          <User className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                        <span className="text-[15px] font-bold text-teal-700 hover:underline cursor-pointer">Michael Williams</span>
                      </div>
                    </div>
                  </div>

                  {/* LOCATION Section */}
                  <div>
                    <h2 className="text-xs font-black text-slate-800 tracking-wider mb-6 pb-2 border-b border-slate-100 uppercase">Location</h2>
                    <div className="grid grid-cols-[140px_1fr] gap-y-5 items-start">
                      <span className="text-sm font-semibold text-slate-500 pt-1">Address</span>
                      <span className="text-[15px] font-medium text-slate-800 leading-relaxed">
                        fyneso<br />India
                      </span>
                      
                      <span className="text-sm font-semibold text-slate-500">Work Location</span>
                      <span className="text-[15px] font-medium text-slate-800">Remote - IN</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Dynamic Organization Chart */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
                    <h2 className="text-xs font-black text-slate-800 tracking-wider uppercase">Organization Chart</h2>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:bg-teal-50 px-2 py-1.5 rounded-md border border-transparent hover:border-teal-200 transition-colors">
                      <Network className="h-3.5 w-3.5" /> Full Screen
                    </button>
                  </div>

                  <div className="pt-2 pl-4 pb-8 overflow-x-auto">
                    {/* Render the recursive dynamic org chart */}
                    <OrgChartNode node={ORG_DATA} />
                  </div>
                </div>

              </div>
            )}

            {/* PRIVATE INFO TAB */}
            {activeTab === 'Private Info' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 animate-in fade-in duration-300">
                <div className="space-y-10">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase mb-4 flex items-center gap-2">
                      <Info className="h-4 w-4 text-teal-600" /> About
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase mb-4">What I love about my job</h3>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase mb-4">My interests and hobbies</h3>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                      <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase">Skills</h3>
                      <button className="text-xs font-bold text-teal-600 hover:underline">+ Add Skills</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Node.js", "System Design", "UI/UX", "Product Strategy"].map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                      <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase">Certifications</h3>
                      <button className="text-xs font-bold text-teal-600 hover:underline">+ Add Cert</button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <FileText className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">AWS Certified Solutions Architect</h4>
                          <p className="text-xs text-slate-500 mt-1">Issued: Jan 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SALARY INFO TAB (Admin Only) */}
            {activeTab === 'Salary Info' && isAdmin && (
              <div className="animate-in fade-in duration-300">
                
                {/* Top Interactive Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-bold text-slate-700 w-32 shrink-0">Month Wage</label>
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                        <input 
                          type="number" 
                          value={monthWage}
                          onChange={(e) => setMonthWage(Number(e.target.value))}
                          className="w-full pl-8 pr-4 py-3 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-500 w-16">/ Month</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="text-sm font-bold text-slate-700 w-32 shrink-0">Yearly Wage</label>
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                        <input 
                          type="number" 
                          value={yearlyWage}
                          readOnly
                          className="w-full pl-8 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700 cursor-not-allowed"
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-500 w-16">/ Yearly</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-bold text-slate-700 flex-1">No of working days in a week</label>
                      <input type="number" defaultValue={5} className="w-24 px-4 py-2 bg-white border border-slate-300 rounded-lg text-center font-bold text-slate-800" />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-bold text-slate-700 flex-1">Break Time</label>
                      <div className="flex items-center gap-2">
                        <input type="number" defaultValue={1} className="w-24 px-4 py-2 bg-white border border-slate-300 rounded-lg text-center font-bold text-slate-800" />
                        <span className="text-sm font-bold text-slate-500">/ hrs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Auto-Calculated Salary Components */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  
                  {/* Left Column: Earnings */}
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase mb-6 pb-2 border-b-2 border-slate-200">Salary Components (Earnings)</h3>
                    <div className="space-y-6">
                      
                      <div className="group border-b border-slate-100 pb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-slate-800">Basic Salary</span>
                          <div className="flex items-center gap-4">
                            <span className="font-extrabold text-teal-700">₹{basic.toFixed(2)}</span>
                            <span className="text-xs font-bold text-slate-400 w-12 text-right">50.00%</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">Defines Basic salary from company; rest compute is based on monthly wages</p>
                      </div>

                      <div className="group border-b border-slate-100 pb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-slate-800">House Rent Allowance</span>
                          <div className="flex items-center gap-4">
                            <span className="font-extrabold text-slate-700">₹{hra.toFixed(2)}</span>
                            <span className="text-xs font-bold text-slate-400 w-12 text-right">50.00%</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">HRA provided to employee. 50% of the basic salary</p>
                      </div>

                      <div className="group border-b border-slate-100 pb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-slate-800">Standard Allowance</span>
                          <div className="flex items-center gap-4">
                            <span className="font-extrabold text-slate-700">₹{standardAllowance.toFixed(2)}</span>
                            <span className="text-xs font-bold text-slate-400 w-12 text-right">16.67%</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">A standard allowance is a predetermined fixed amount provided to employee</p>
                      </div>

                      <div className="group border-b border-slate-100 pb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-slate-800">Performance Bonus</span>
                          <div className="flex items-center gap-4">
                            <span className="font-extrabold text-slate-700">₹{performanceBonus.toFixed(2)}</span>
                            <span className="text-xs font-bold text-slate-400 w-12 text-right">8.33%</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">Variable amount paid during payroll</p>
                      </div>

                      <div className="group border-b border-slate-100 pb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-slate-800">Leave Travel Allowance</span>
                          <div className="flex items-center gap-4">
                            <span className="font-extrabold text-slate-700">₹{leaveTravel.toFixed(2)}</span>
                            <span className="text-xs font-bold text-slate-400 w-12 text-right">8.33%</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">LTA is paid to cover travel expenses</p>
                      </div>

                      <div className="group border-b border-slate-100 pb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-slate-800">Fixed Allowance</span>
                          <div className="flex items-center gap-4">
                            <span className="font-extrabold text-slate-700">₹{fixedAllowance.toFixed(2)}</span>
                            <span className="text-xs font-bold text-slate-400 w-12 text-right">--</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">Fixed allowance portion of wages is determined after calculating all salary components</p>
                      </div>

                      <div className="pt-2 flex justify-between items-center bg-teal-50 p-4 rounded-xl border border-teal-100">
                        <span className="text-sm font-black text-teal-900 uppercase tracking-wide">Gross Earnings</span>
                        <span className="text-lg font-black text-teal-700">₹{monthWage.toFixed(2)}</span>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: Deductions & Notes */}
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-sm font-black text-red-900 tracking-wider uppercase mb-6 pb-2 border-b-2 border-red-100">Provident Fund (PF) & Tax</h3>
                      <div className="space-y-6">
                        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-slate-800">Employee PF</span>
                            <div className="flex items-center gap-4">
                              <span className="font-extrabold text-red-600">-₹{pf.toFixed(2)}</span>
                              <span className="text-xs font-bold text-slate-400 w-12 text-right">12.00%</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-500">PF is calculated based on the basic salary</p>
                        </div>
                        
                        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-slate-800">Professional Tax</span>
                            <div className="flex items-center gap-4">
                              <span className="font-extrabold text-red-600">-₹{tax.toFixed(2)}</span>
                              <span className="text-xs font-bold text-slate-400 w-12 text-right">Fixed</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-500">Professional Tax deducted from gross salary</p>
                        </div>

                        <div className="pt-2 flex justify-between items-center bg-red-50 p-4 rounded-xl border border-red-100">
                          <span className="text-sm font-black text-red-900 uppercase tracking-wide">Total Deductions</span>
                          <span className="text-lg font-black text-red-600">-₹{totalDeductions.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Net Pay Summary */}
                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full blur-[80px] opacity-30"></div>
                      <h3 className="text-xs font-black text-slate-400 tracking-wider uppercase mb-2">Estimated Net Pay</h3>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-black tracking-tight">₹{netPay.toFixed(2)}</span>
                        <span className="text-sm font-bold text-slate-400 mb-1">/ month</span>
                      </div>
                    </div>

                    {/* Important Info Card from Wireframe */}
                    <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                      <h3 className="text-sm font-black text-amber-900 tracking-wider uppercase mb-4 flex items-center gap-2">
                        <Info className="h-4 w-4" /> Important
                      </h3>
                      <div className="text-xs text-amber-800/80 space-y-3 leading-relaxed font-medium">
                        <p>The Salary Information tab allows users to define and manage all salary-related details for an employee, including wage type, working schedule, salary components, benefits.</p>
                        <p><strong>- Automatic Calculation:</strong> The system should calculate each component amount based on the employee's defined wage.</p>
                        <p><strong>Example:</strong> If Wage = ₹50,000 and Basic = 50% of wage, then Basic = ₹25,000. If HRA = 50% of Basic, then HRA = ₹12,500.</p>
                        <p>Each fields for configuration (e.g. PF rate 12%) and Professional Tax 200 are hardcoded in this demo per wireframe rules.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}
