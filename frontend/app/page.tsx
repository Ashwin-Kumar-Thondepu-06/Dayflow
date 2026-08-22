import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { AppGrid } from "@/components/landing/AppGrid"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex flex-col pt-24">
        <Hero />
        <AppGrid />
      </main>
    </div>
  )
}
