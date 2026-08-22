"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/providers/AuthContext"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Save, Mail, Phone, Briefcase } from "lucide-react"
import { fetchApi } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function EmployeeProfilePage() {
  const { user, login } = useAuth()
  const { toast } = useToast()
  
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    async function loadProfile() {
      if (!user?.employeeId) return;
      try {
        const response = await fetchApi(`/employees/${user.employeeId}`)
        if (response.success) {
          setProfile(response.data)
          setFormData(response.data)
        }
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [user, toast])

  const handleSave = async () => {
    if (!user?.employeeId) return;
    try {
      const response = await fetchApi(`/employees/${user.employeeId}`, {
        method: "PUT",
        // Only sending editable fields
        body: JSON.stringify({
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName
        }),
      })
      if (response.success) {
        setProfile(response.data)
        setIsEditing(false)
        // Refresh context user data if needed
        toast({ title: "Success", description: "Profile updated successfully." })
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }
  }

  if (loading) {
    return <div className="py-10 text-center text-muted-foreground">Loading profile...</div>
  }

  if (!profile) {
    return <div className="py-10 text-center">Unable to load profile data.</div>
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Profile" 
        description="Manage your personal information and contact details."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="border-t-4 border-t-[#714B67]">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-3xl mb-4">
                {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{profile.firstName} {profile.lastName}</h2>
              <p className="text-muted-foreground mb-4">{profile.designation?.name || 'Employee'}</p>
              
              <div className="w-full space-y-3 text-sm text-left pt-4 border-t">
                <div className="flex items-center text-slate-600">
                  <Mail className="h-4 w-4 mr-3" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>{profile.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Briefcase className="h-4 w-4 mr-3" />
                  <span>{profile.employeeCode}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Update your contact information.</CardDescription>
              </div>
              <Button 
                variant={isEditing ? "default" : "outline"} 
                className={isEditing ? "bg-[#714B67] hover:bg-[#5a3a52] text-white" : ""}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? <><Save className="mr-2 h-4 w-4" /> Save</> : <><Edit className="mr-2 h-4 w-4" /> Edit</>}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input 
                    value={isEditing ? formData.firstName : profile.firstName} 
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input 
                    value={isEditing ? formData.lastName : profile.lastName} 
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input 
                    value={isEditing ? formData.phone : (profile.phone || '')} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email (Login)</Label>
                  <Input 
                    value={user?.email || ''} 
                    disabled={true} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
