"use client"

import * as React from "react"
import Link from "next/link"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { fetchApi } from "@/lib/api"
import { useAuth } from "@/components/providers/AuthContext"

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [companyName, setCompanyName] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [logo, setLogo] = React.useState<File | null>(null)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast({ variant: "destructive", title: "Error", description: "Passwords do not match." });
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('companyName', companyName);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      if (logo) formData.append('logo', logo);

      const response = await fetchApi('/auth/register', {
        method: 'POST',
        body: formData, // fetchApi will not stringify if body is FormData
      })

      toast({
        title: "Account Created",
        description: "Your account has been created and you are now logged in.",
      })

      login(response.data)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] bg-white/80 backdrop-blur-2xl sm:p-4 rounded-[2rem]">
      <CardHeader className="space-y-2 pb-8">
        <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-slate-900">
          Create an account
        </CardTitle>
        <CardDescription className="text-center text-slate-500 text-base">
          Enter your details to create your Dayflow account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-5">
            <div className="grid gap-2.5">
              <Label htmlFor="companyName" className="font-semibold text-slate-700 ml-1">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Dayflow Inc."
                disabled={isLoading}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] h-12 rounded-xl transition-all px-4 text-base"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2.5">
                <Label htmlFor="firstName" className="font-semibold text-slate-700 ml-1">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  disabled={isLoading}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] h-12 rounded-xl transition-all px-4 text-base"
                  required
                />
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="lastName" className="font-semibold text-slate-700 ml-1">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  disabled={isLoading}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] h-12 rounded-xl transition-all px-4 text-base"
                />
              </div>
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="email" className="font-semibold text-slate-700 ml-1">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] h-12 rounded-xl transition-all px-4 text-base"
                required
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="phone" className="font-semibold text-slate-700 ml-1">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                disabled={isLoading}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] h-12 rounded-xl transition-all px-4 text-base"
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="logo" className="font-semibold text-slate-700 ml-1">Company Logo</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                disabled={isLoading}
                onChange={(e) => setLogo(e.target.files?.[0] || null)}
                className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] rounded-xl transition-all px-4 text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#714B67]/10 file:text-[#714B67] hover:file:bg-[#714B67]/20 pt-2 h-12"
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="password" className="font-semibold text-slate-700 ml-1">Password</Label>
              <Input
                id="password"
                type="password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-50/50 border-slate-200/80 focus-visible:ring-[#714B67]/20 focus-visible:border-[#714B67] h-12 rounded-xl transition-all px-4 text-base"
                required
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="confirmPassword" className="font-semibold text-slate-700 ml-1">Confirm Password</Label>
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
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="px-8 text-center text-sm font-medium text-slate-500 w-full">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#714B67] hover:text-[#5a3a52] transition-colors"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
