"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Edit, Save, Trash2, Mail, Phone, Calendar, Briefcase } from "lucide-react"
import { fetchApi } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function EmployeeProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [employee, setEmployee] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    async function loadEmployee() {
      try {
        const response = await fetchApi(`/employees/${params.id}`)
        if (response.success) {
          setEmployee(response.data)
          setFormData(response.data)
        }
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" })
        router.push("/admin/employees")
      } finally {
        setLoading(false)
      }
    }
    if (params.id) {
      loadEmployee()
    }
  }, [params.id, router, toast])

  const handleSave = async () => {
    try {
      const response = await fetchApi(`/employees/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      })
      if (response.success) {
        setEmployee(response.data)
        setIsEditing(false)
        toast({ title: "Success", description: "Employee updated successfully" })
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>
  }

  if (!employee) {
    return <div>Employee not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/employees"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <PageHeader 
          title={`${employee.firstName} ${employee.lastName}`} 
          description={employee.employeeCode}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border-t-4 border-t-[#714B67]">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-3xl mb-4">
                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{employee.firstName} {employee.lastName}</h2>
              <p className="text-muted-foreground mb-4">{employee.designation?.name || 'No Designation'}</p>
              <Badge variant={employee.status === 'ACTIVE' ? 'success' : 'secondary'} className="mb-4">
                {employee.status}
              </Badge>
              
              <div className="w-full space-y-3 text-sm text-left pt-4 border-t">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span className="truncate">{employee.user?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>{employee.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>{employee.department?.name || 'No Department'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>Joined {new Date(employee.joiningDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="payslips">Payslips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update the employee's personal and job details.</CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "default" : "outline"} 
                    className={isEditing ? "bg-[#714B67] hover:bg-[#5a3a52] text-white" : ""}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? <><Save className="mr-2 h-4 w-4" /> Save Changes</> : <><Edit className="mr-2 h-4 w-4" /> Edit</>}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input 
                        value={isEditing ? formData.firstName : employee.firstName} 
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input 
                        value={isEditing ? formData.lastName : employee.lastName} 
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input 
                        value={isEditing ? formData.phone : (employee.phone || '')} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Input 
                        value={isEditing ? formData.status : employee.status} 
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        disabled={!isEditing} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Manage employee contracts and identity documents.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-10 text-center text-muted-foreground flex flex-col items-center justify-center">
                    <p>Document management feature coming soon.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payslips" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payslips</CardTitle>
                  <CardDescription>View historical payslips for this employee.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-10 text-center text-muted-foreground flex flex-col items-center justify-center">
                    <p>Payroll feature coming soon.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
