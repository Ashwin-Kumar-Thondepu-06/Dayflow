import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
}

export function LoadingState({ text = "Loading...", className, ...props }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] w-full flex-col items-center justify-center text-muted-foreground",
        className
      )}
      {...props}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {text && <p className="mt-4 text-sm font-medium">{text}</p>}
    </div>
  )
}
