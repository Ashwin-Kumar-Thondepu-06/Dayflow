"use client"

import { useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DataTable, Column } from "@/components/common/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlaneTakeoff, Plus } from "lucide-react"

// Mock data until backend is implemented
const mockMyLeaves = [
  { id: "LR001", type: "Annual Leave", start: "2023-11-15", end: "2023-11-20", status: "PENDING", days: 5 },
  { id: "LR005", type: "Sick Leave", start: "2023-08-10", end: "2023-08-11", status: "APPROVED", days: 2 },
]

const myLeaveColumns: Column<any>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Leave Type", accessorKey: "type" },
  { header: "Start Date", accessorKey: "start" },
  { header: "End Date", accessorKey: "end" },
  { header: "Days", accessorKey: "days" },
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
  }
]

export default function EmployeeLeavePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Leave Management" 
          description="View your balances and submit time-off requests."
        />
        <Button className="bg-[#714B67] hover:bg-[#5a3a52] text-white">
          <Plus className="mr-2 h-4 w-4" /> Request Leave
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-[#714B67]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Annual Leave</CardTitle>
            <CardDescription>Available balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">14 Days</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sick Leave</CardTitle>
            <CardDescription>Available balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5 Days</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Compensatory Off</CardTitle>
            <CardDescription>Available balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0 Days</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-t-4 border-t-[#714B67]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PlaneTakeoff className="h-5 w-5 mr-2" />
            My Leave History
          </CardTitle>
          <CardDescription>Past and pending time-off requests</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={myLeaveColumns} data={mockMyLeaves} />
        </CardContent>
      </Card>
    </div>
  )
}
