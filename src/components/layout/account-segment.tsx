"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, UploadCloud } from "lucide-react"
import { toast } from "sonner"
import { useUserStore } from "@/store/user-info"
export default function AccountSegment() {
  const { name, email, avatarUrl, setName, setEmail, setAvatarUrl } = useUserStore()
  const [tempName, setTempName] = useState(name)
  const [tempEmail, setTempEmail] = useState(email)
  const [tempAvatar, setTempAvatar] = useState(avatarUrl)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed")
      return
    }    
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Avatar must be under 2MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setTempAvatar(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setName(tempName)
      setEmail(tempEmail)
      setAvatarUrl(tempAvatar)
      setLoading(false)
      toast.success("Account updated successfully")
    }, 1000)
  }

  return (
    <div className="w-2/3 min-w-2xs mx-auto my-6 p-6 bg-muted/40 rounded-2xl shadow-xl space-y-6 overflow-hidden">
      <div>
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-muted-foreground text-sm">Update your personal information</p>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20 border">
        {tempAvatar ? (
  <AvatarImage src={tempAvatar} />
) : (
  <AvatarFallback>{tempName?.slice(0, 2).toUpperCase() || "NA"}</AvatarFallback>
)}
        </Avatar>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />
          <Button
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            Change Avatar
          </Button>
          <p className="text-xs text-muted-foreground mt-1">Max file size: 2MB</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={tempName} onChange={(e) => setTempName(e.target.value)} maxLength={20} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} maxLength={30} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Save Changes
        </Button>
      </div>
    </div>
  )
}
