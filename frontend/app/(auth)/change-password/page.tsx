"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { fetchApi } from "@/lib/api"
import { useAuth } from "@/components/providers/AuthContext"

export default function ChangePasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    
    if (newPassword !== confirmPassword) {
      toast({ variant: "destructive", title: "Error", description: "New passwords do not match." })
      return
    }
    
    if (newPassword.length < 8) {
      toast({ variant: "destructive", title: "Error", description: "Password must be at least 8 characters long." })
      return
    }

    setIsLoading(true)

    try {
      await fetchApi('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      toast({
        title: "Success",
        description: "Password changed successfully.",
      })

      // Redirect based on role
      if (user?.role === 'EMPLOYEE') {
        router.push('/employee/dashboard')
      } else {
        router.push('/admin/dashboard')
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to change password. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] bg-white/80 backdrop-blur-2xl sm:p-4 rounded-[2rem]">
      <CardHeader className="space-y-2 pb-8">
        <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-slate-900">
          Change Password
        </CardTitle>
        <CardDescription className="text-center text-slate-500 text-base">
          For security reasons, you must change your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-5">
            <div className="grid gap-2.5">
              <Label htmlFor="currentPassword" className="font-semibold text-slate-700 ml-1">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                disabled={isLoading}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] h-12 rounded-xl transition-all px-4 text-base"
                required
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="newPassword" className="font-semibold text-slate-700 ml-1">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                disabled={isLoading}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] h-12 rounded-xl transition-all px-4 text-base"
                required
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="confirmPassword" className="font-semibold text-slate-700 ml-1">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                disabled={isLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] h-12 rounded-xl transition-all px-4 text-base"
                required
              />
            </div>
            <Button disabled={isLoading} className="mt-4 h-12 text-base font-semibold rounded-xl bg-[#714B67] hover:bg-[#5a3a52] text-white shadow-[0_4px_14px_0_rgba(113,75,103,0.39)] hover:shadow-[0_6px_20px_rgba(113,75,103,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              {isLoading ? "Updating..." : "Change Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
