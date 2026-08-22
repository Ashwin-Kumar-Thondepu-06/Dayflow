import * as React from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden border-r bg-background md:block md:w-64 shrink-0">
          <Sidebar className="sticky top-0 h-screen" />
        </div>
        
        {/* Main Content Area */}
        <div className="flex w-full flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
