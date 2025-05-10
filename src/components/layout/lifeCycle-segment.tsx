import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2, Clock } from "lucide-react"
import { ReactNode } from "react"

type Status = "done" | "in_progress" | "pending"

interface Stage {
  title: string
  status: Status
}


const lifecycleStages: Stage[] = [
  { title: "Signed Up", status: "done" },
  { title: "Onboarding", status: "in_progress" },
  { title: "Activated", status: "pending" },
]

const statusIcons: Record<Status, ReactNode> = {
  done: <CheckCircle className="text-green-500 w-5 h-5" />,
  in_progress: <Loader2 className="animate-spin text-blue-500 w-5 h-5" />,
  pending: <Clock className="text-yellow-500 w-5 h-5" />,
}

export default function LifeCycleSegment() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 md:py-6 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
      {lifecycleStages.map((stage, idx) => (
        <Card key={idx}>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{stage.title}</CardTitle>
            {statusIcons[stage.status]}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground capitalize">
              Status: {stage.status.replace("_", " ")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
