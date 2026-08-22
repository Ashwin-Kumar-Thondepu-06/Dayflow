import * as React from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  retryAction?: () => void
  actionLabel?: string
}

export function ErrorState({
  title = "Something went wrong",
  description = "There was a problem loading this data. Please try again.",
  retryAction,
  actionLabel = "Try Again",
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center rounded-md border p-8 text-center bg-destructive/5 text-destructive",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>
      {retryAction && (
        <Button variant="outline" onClick={retryAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
