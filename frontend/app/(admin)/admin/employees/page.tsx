"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, MoreVertical, Briefcase, Mail } from "lucide-react"
import { fetchApi } from "@/lib/api"
import Link from "next/link"

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function loadEmployees() {
      try {
        const response = await fetchApi('/employees')
        if (response.success) {
          setEmployees(response.data)
        }
      } catch (error) {
        console.error("Failed to load employees", error)
      } finally {
        setLoading(false)
      }
    }
    loadEmployees()
  }, [])

  const filteredEmployees = employees.filter(emp => 
    emp.firstName?.toLowerCase().includes(search.toLowerCase()) || 
    emp.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    emp.employeeCode?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Employees" 
          description="Manage company employees and access their profiles."
        />
        <Button className="bg-[#714B67] hover:bg-[#5a3a52] text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm">
        <Search className="h-5 w-5 text-muted-foreground ml-2" />
        <Input 
          placeholder="Search employees by name or ID..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 shadow-none focus-visible:ring-0 text-base"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-muted-foreground">Loading employees...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEmployees.map(emp => (
            <Link href={`/admin/employees/${emp.id}`} key={emp.id}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden border-t-4 border-t-[#714B67]">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3 items-center">
                      <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
                        {emp.firstName?.charAt(0)}{emp.lastName?.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{emp.firstName} {emp.lastName}</CardTitle>
                        <p className="text-sm text-muted-foreground font-medium">{emp.employeeCode}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <Badge variant={emp.status === 'ACTIVE' ? 'success' : 'secondary'} className="mb-2">
                    {emp.status}
                  </Badge>
                  <div className="flex items-center text-sm text-slate-600">
                    <Briefcase className="mr-2 h-4 w-4 text-slate-400" />
                    {emp.designation?.name || 'No Designation'}
                  </div>
                  <div className="flex items-center text-sm text-slate-600 truncate">
                    <Mail className="mr-2 h-4 w-4 text-slate-400" />
                    {emp.user?.email || 'No email'}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
      
      {!loading && filteredEmployees.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-slate-50">
          <p className="text-muted-foreground text-lg">No employees found.</p>
        </div>
      )}
    </div>
  )
}
