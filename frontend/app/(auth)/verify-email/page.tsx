"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { MailCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
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

function VerifyEmailForm() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  const token = searchParams.get("token")
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isVerified, setIsVerified] = React.useState<boolean>(false)

  React.useEffect(() => {
    async function verifyToken(tokenString: string) {
      setIsLoading(true)
      try {
        await fetchApi('/auth/verify-email', {
          method: 'POST',
          body: JSON.stringify({ token: tokenString }),
        })
        setIsVerified(true)
        toast({
          title: "Verified",
          description: "Your email has been successfully verified. You can now sign in.",
        })
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: error.message || "Invalid or expired token.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (token) {
      verifyToken(token)
    }
  }, [token, toast])

  return (
    <Card className="border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] bg-white/80 backdrop-blur-2xl sm:p-4 rounded-[2rem]">
      <CardHeader className="space-y-4 text-center pb-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#714B67] to-[#5a3a52] shadow-[0_8px_20px_rgba(113,75,103,0.3)]">
          <MailCheck className="h-10 w-10 text-white" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900">
            {isVerified ? "Email verified" : "Check your email"}
          </CardTitle>
          <CardDescription className="text-slate-500 text-base">
            {isVerified 
              ? "Your account is now verified and active." 
              : "We sent a verification link to your email address. Please click the link to verify your account."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button disabled={isLoading || isVerified} onClick={() => {
            toast({ description: "Resend functionality not yet implemented in backend." })
          }} className="mt-2 h-12 text-base font-semibold rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300">
            {isLoading ? "Verifying..." : isVerified ? "Verified" : "Resend Verification Link"}
          </Button>
        </div>
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

export default function VerifyEmailPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailForm />
    </React.Suspense>
  )
}
