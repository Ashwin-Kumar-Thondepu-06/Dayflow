"use client"
import * as React from "react"

export const AttendanceContext = React.createContext<{
  isCheckedIn: boolean;
  setIsCheckedIn: (v: boolean) => void;
  checkInTime: Date | null;
  setCheckInTime: (d: Date | null) => void;
}>({
  isCheckedIn: false,
  setIsCheckedIn: () => {},
  checkInTime: null,
  setCheckInTime: () => {}
})

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [isCheckedIn, setIsCheckedIn] = React.useState(false)
  const [checkInTime, setCheckInTime] = React.useState<Date | null>(null)
  
  return (
    <AttendanceContext.Provider value={{ isCheckedIn, setIsCheckedIn, checkInTime, setCheckInTime }}>
      {children}
    </AttendanceContext.Provider>
  )
}
