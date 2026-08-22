import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative w-full pt-10 pb-6 flex flex-col items-center justify-center text-center px-4 overflow-visible shrink-0">
      
      {/* Premium subtle mesh background */}
      <div className="absolute inset-0 -z-10 h-[200%] w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute top-0 -z-10 h-[200%] w-full bg-white bg-[radial-gradient(ellipse_40%_40%_at_80%_20%,rgba(255,183,77,0.08),rgba(255,255,255,0))]"></div>
      <div className="absolute bottom-0 -z-10 h-[200%] w-full bg-white bg-[radial-gradient(ellipse_60%_60%_at_20%_80%,rgba(0,160,210,0.08),rgba(255,255,255,0))]"></div>

      <div className="space-y-6 max-w-4xl relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] drop-shadow-sm">
          All your HR on{" "}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10 italic">one platform.</span>
            {/* Yellow marker highlight */}
            <span
              className="absolute -inset-1 z-0 rounded-md bg-[#FFB74D] opacity-90 shadow-sm"
              style={{ transform: "rotate(-1.5deg)" }}
              aria-hidden="true"
            />
          </span>
          <br className="hidden sm:block" />
          <span className="mt-4 inline-block font-medium italic text-slate-700">
            Simple, efficient, yet{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 font-bold">powerful!</span>
              {/* Blue wavy underline */}
              <svg
                className="absolute -bottom-3 left-0 w-full h-4 text-[#00A0D2] drop-shadow-sm"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,10 Q25,20 50,10 T100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </h1>
        
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full bg-[#714B67] hover:bg-[#5a3a52] text-white px-8 h-12 text-base font-semibold shadow-[0_4px_14px_0_rgba(113,75,103,0.39)] hover:shadow-[0_6px_20px_rgba(113,75,103,0.3)] hover:-translate-y-0.5 transition-all duration-200">
            <Link href="/signup">Start now - It's free</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 h-12 text-base font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <Link href="/contact">Meet an advisor</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
