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
    <Card className="border-0 shadow-none lg:border lg:shadow-sm">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <MailCheck className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {isVerified ? "Email verified" : "Check your email"}
          </CardTitle>
          <CardDescription>
            {isVerified 
              ? "Your account is now verified and active." 
              : "We sent a verification link to your email address. Please click the link to verify your account."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button variant="outline" disabled={isLoading || isVerified} onClick={() => {
            toast({ description: "Resend functionality not yet implemented in backend." })
          }}>
            {isLoading ? "Verifying..." : isVerified ? "Verified" : "Resend Verification Link"}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="px-8 text-center text-sm text-muted-foreground w-full">
          <Link
            href="/login"
            className="hover:text-primary hover:underline underline-offset-4 font-medium text-primary"
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
