import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Banknote } from "lucide-react"

export default function EmployeePayrollPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Payroll" 
        description="View your payslips and salary structures."
      />
      <Card className="border-t-4 border-t-[#714B67]">
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-20 mt-6 text-center text-muted-foreground flex flex-col items-center justify-center bg-slate-50">
            <Banknote className="h-12 w-12 mb-4 text-slate-300" />
            <p className="text-lg font-medium">Payroll Module Coming Soon</p>
            <p className="text-sm">This section will allow you to download your monthly payslips.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
