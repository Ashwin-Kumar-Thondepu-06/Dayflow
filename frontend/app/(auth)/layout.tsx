import * as React from "react"
import Link from "next/link"
import { Hexagon } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-4">
      {/* Premium subtle mesh background (Full Screen) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_40%_40%_at_80%_20%,rgba(255,183,77,0.08),rgba(255,255,255,0))]"></div>
      <div className="absolute bottom-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_60%_60%_at_20%_80%,rgba(0,160,210,0.08),rgba(255,255,255,0))]"></div>

      <Link href="/" className="absolute top-8 left-8 flex items-center space-x-2 group">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-sm transition-transform group-hover:scale-105">
          <Hexagon className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">
          Dayflow
        </span>
      </Link>

      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in duration-500">
        {children}
      </div>
    </div>
  )
}
