import Link from "next/link"
import { Hexagon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <header className="pointer-events-auto w-full max-w-5xl rounded-full border border-white/20 bg-white/60 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-sm transition-transform group-hover:scale-105">
                <Hexagon className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Dayflow
              </span>
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link
                href="#apps"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Apps
              </Link>
              <Link
                href="#features"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
              Sign in
            </Link>
            <Button asChild className="rounded-full bg-slate-900 hover:bg-slate-800 text-white border-0 px-6 h-10 shadow-[0_4px_14px_0_rgb(0,0,0,15%)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5 transition-all duration-200">
              <Link href="/signup">Try it free</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
