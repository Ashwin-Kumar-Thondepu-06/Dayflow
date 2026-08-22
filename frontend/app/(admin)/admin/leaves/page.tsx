"use client"

import { useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable, Column } from "@/components/common/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Calendar as CalendarIcon, List } from "lucide-react"

// Mock data until backend is implemented
const mockLeaves = [
  { id: "LR001", employee: "Charlie Davis", type: "Annual Leave", start: "2023-11-15", end: "2023-11-20", status: "PENDING" },
  { id: "LR002", employee: "Diana Prince", type: "Sick Leave", start: "2023-11-10", end: "2023-11-11", status: "APPROVED" },
]

export default function AdminLeavesPage() {
  const [activeTab, setActiveTab] = useState("list")

  const leaveColumns: Column<any>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Employee", accessorKey: "employee" },
    { header: "Leave Type", accessorKey: "type" },
    { header: "Start Date", accessorKey: "start" },
    { header: "End Date", accessorKey: "end" },
    { 
      header: "Status", 
      accessorKey: "status",
      cell: (item) => (
        <Badge variant={
          item.status === "APPROVED" ? "success" : 
          item.status === "REJECTED" ? "destructive" : 
          "warning"
        }>
          {item.status}
        </Badge>
      )
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (item) => (
        item.status === "PENDING" ? (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
              <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              <XCircle className="h-4 w-4 mr-1" /> Reject
            </Button>
          </div>
        ) : <span className="text-muted-foreground text-sm">Processed</span>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Leave Requests" 
          description="Review and manage employee time off."
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4 bg-white p-2 rounded-lg border shadow-sm">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="list"><List className="h-4 w-4 mr-2" /> List</TabsTrigger>
            <TabsTrigger value="calendar"><CalendarIcon className="h-4 w-4 mr-2" /> Calendar</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="list" className="mt-0">
          <Card className="border-t-4 border-t-[#714B67]">
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Pending and processed requests</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={leaveColumns} data={mockLeaves} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <Card className="border-t-4 border-t-[#714B67]">
            <CardHeader>
              <CardTitle>Leave Calendar</CardTitle>
              <CardDescription>Visual overview of team availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-20 text-center text-muted-foreground flex flex-col items-center justify-center bg-slate-50">
                <CalendarIcon className="h-12 w-12 mb-4 text-slate-300" />
                <p className="text-lg font-medium">Calendar view under construction.</p>
                <p className="text-sm">This feature will be integrated with the backend leave schedule.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
