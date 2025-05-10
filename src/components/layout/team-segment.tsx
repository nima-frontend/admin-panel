"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MoreVertical } from "lucide-react"

type Member = {
  id: number
  name: string
  role: string
  status: "online" | "offline"
  avatar: string
}

const initialMembers: Member[] = [
  {
    id: 1,
    name: "Nima Pourdad",
    role: "Founder",
    status: "online",
    avatar: "/avatar.png",
  },
  {
    id: 2,
    name: "Ali Aliani",
    role: "Developer",
    status: "offline",
    avatar: "/person_1.jpg",
  },
  {
    id: 3,
    name: "Soheil Aliani",
    role: "Developer",
    status: "offline",
    avatar: "person_2.jpg",
  },
  {
    id: 4,
    name: "Javaad Javaadi",
    role: "Salesman",
    status: "offline",
    avatar: "person_3.jpg",
  },
]

export default function TeamSegment() {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)

  const [inviteForm, setInviteForm] = useState({ name: "", role: "", email: "" })
  const [editRole, setEditRole] = useState("")

  const handleInvite = () => {
    setMembers([
      ...members,
      {
        id: Date.now(),
        name: inviteForm.name,
        role: inviteForm.role,
        status: "offline",
        avatar: "/default.jpg",
      },
    ])
    setInviteForm({ name: "", role: "", email: "" })
    setInviteDialogOpen(false)
  }

  const handleEditRole = () => {
    if (!selectedMember) return
    setMembers(
      members.map((m) =>
        m.id === selectedMember.id ? { ...m, role: editRole } : m
      )
    )
    setEditDialogOpen(false)
  }

  const handleRemove = () => {
    if (!selectedMember) return
    setMembers(members.filter((m) => m.id !== selectedMember.id))
    setRemoveDialogOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center p-4 md:p-6">
        <h2 className="text-3xl font-bold">Team</h2>

        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>Invite Teammate</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Teammate</DialogTitle>
              <DialogDescription>
                Add a new team member by entering their info below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={inviteForm.name}
                  onChange={(e) =>
                    setInviteForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={inviteForm.email}
                  onChange={(e) =>
                    setInviteForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-4">
                <Label>Role</Label>
                <Input
                  value={inviteForm.role}
                  onChange={(e) =>
                    setInviteForm((f) => ({ ...f, role: e.target.value }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleInvite}>Send Invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 mb-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
        {members.map((member) => (
          <Card key={member.id} className="relative group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">{member.role}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedMember(member)
                      setEditRole(member.role)
                      setEditDialogOpen(true)
                    }}
                  >
                    Edit Role
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedMember(member)
                      setRemoveDialogOpen(true)
                    }}
                    className="text-destructive"
                  >
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{member.name}</p>
                <Badge
                  variant={member.status === "online" ? "default" : "outline"}
                >
                  {member.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Change the role for <strong>{selectedMember?.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={editRole}
            onChange={(e) => setEditRole(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleEditRole}>Update Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Teammate</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove{" "}
              <strong>{selectedMember?.name}</strong> from the team?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={()=>{
              if(selectedMember?.id!==1){
                handleRemove()
              }
            }}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
