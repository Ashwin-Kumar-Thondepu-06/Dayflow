import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function EmployeeDocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Documents" 
        description="Access your official documents and contracts."
      />
      <Card className="border-t-4 border-t-[#714B67]">
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-20 mt-6 text-center text-muted-foreground flex flex-col items-center justify-center bg-slate-50">
            <FileText className="h-12 w-12 mb-4 text-slate-300" />
            <p className="text-lg font-medium">Document Hub Coming Soon</p>
            <p className="text-sm">You will be able to view and download your documents here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
