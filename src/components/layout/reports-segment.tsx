import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

type ProjectStatus = "in_progress"

interface Project {
  id: number
  name: string
  description: string
  owner: {
    name: string
    avatarUrl?: string
  }
  status: ProjectStatus
  progress: number
}

const projects: Project[] = [
  {
    id: 1,
    name: "Project Alpha",
    description: "Project Alpha is almost done thanks to the great Teamwork",
    owner: { name: "Ali", avatarUrl: "/person_1.jpg" },
    status: "in_progress",
    progress: 90,
  },
  {
    id: 2,
    name: "Project Beta",
    description: "Develop MVP for Android/iOS.",
    owner: { name: "Soheil", avatarUrl: "/person_2.jpg" },
    status: "in_progress",
    progress: 20,
  }
]

const statusBadge = {
  in_progress: <Badge variant="default">In Progress</Badge>
}

export default function ReportsSegment() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 lg:grid-cols-2 py-4 md:py-6 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 bg-muted/40">
    {projects.map((project) => (
      <Card key={project.id}>
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="mt-2">{project.description}</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={project.owner.avatarUrl} />
                <AvatarFallback>{project.owner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">reported by {project.owner.name}</span>
            </div>
            {statusBadge[project.status]}
          </div>
          <Progress value={project.progress} />
        </CardContent>

        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {project.progress}% complete
          </p>
        </CardFooter>
      </Card>
    ))}
  </div>
  )
}
