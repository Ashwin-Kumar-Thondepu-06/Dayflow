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
import { useToast } from "@/components/ui/use-toast"
import { fetchApi } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      toast({
        title: "Success",
        description: "Logged in successfully.",
      })

      // Redirect based on role
      if (response.data?.role === 'EMPLOYEE') {
        router.push('/employee/dashboard')
      } else {
        router.push('/admin/dashboard')
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] bg-white/80 backdrop-blur-2xl sm:p-4 rounded-[2rem]">
      <CardHeader className="space-y-2 pb-8">
        <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-slate-900">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center text-slate-500 text-base">
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-5">
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
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="font-semibold text-slate-700">Password</Label>
                <Link
                  href="/forget-password"
                  className="text-sm font-semibold text-[#714B67] hover:text-[#5a3a52] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
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
            <Button disabled={isLoading} className="mt-4 h-12 text-base font-semibold rounded-xl bg-[#714B67] hover:bg-[#5a3a52] text-white shadow-[0_4px_14px_0_rgba(113,75,103,0.39)] hover:shadow-[0_6px_20px_rgba(113,75,103,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="px-8 text-center text-sm font-medium text-slate-500 w-full">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#714B67] hover:text-[#5a3a52] hover:underline underline-offset-4 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
