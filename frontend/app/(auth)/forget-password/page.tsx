"use client"

import * as React from "react"
import Link from "next/link"

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

export default function ForgetPasswordPage() {
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState("")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await fetchApi('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })

      toast({
        title: "Link Sent",
        description: "If an account exists, a reset link has been sent to your email.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send reset link.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] bg-white/80 backdrop-blur-2xl sm:p-4 rounded-[2rem]">
      <CardHeader className="space-y-2 pb-8">
        <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-slate-900">
          Forgot password?
        </CardTitle>
        <CardDescription className="text-center text-slate-500 text-base">
          Enter your email address and we will send you a link to reset your password.
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
            <Button disabled={isLoading} className="mt-4 h-12 text-base font-semibold rounded-xl bg-[#714B67] hover:bg-[#5a3a52] text-white shadow-[0_4px_14px_0_rgba(113,75,103,0.39)] hover:shadow-[0_6px_20px_rgba(113,75,103,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              {isLoading ? "Sending link..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="px-8 text-center text-sm font-medium text-slate-500 w-full">
          <Link
            href="/login"
            className="font-bold text-[#714B67] hover:text-[#5a3a52] transition-colors"
          >
            Back to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
