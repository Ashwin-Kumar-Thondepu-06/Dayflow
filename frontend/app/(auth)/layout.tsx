import * as React from "react"
import Link from "next/link"
import { Hexagon } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Hexagon className="mr-2 h-6 w-6" />
          Dayflow HRMS
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Streamline your core HR operations, employee onboarding, attendance tracking, and payroll with enterprise-grade reliability.&rdquo;
            </p>
            <footer className="text-sm text-primary-foreground/80">
              The Dayflow Team
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 flex h-full items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  )
}
