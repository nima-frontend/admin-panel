"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

type Dataset = {
  id: number
  name: string
  size: string
  uploaded: string
}

export default function DataLibrary() {
  const [datasets, setDatasets] = useState<Dataset[]>([
    { id: 1, name: "User Data", size: "12MB", uploaded: "2025-05-09" },
    { id: 2, name: "Survey Results", size: "8MB", uploaded: "2025-05-07" },
    { id: 3, name: "Activity Logs", size: "15MB", uploaded: "2025-05-01" },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingDataset, setEditingDataset] = useState<Dataset | null>(null)
  const [formData, setFormData] = useState({ name: "", size: "" })

  const openNewDatasetDialog = () => {
    setIsEditMode(false)
    setFormData({ name: "", size: "" })
    setIsDialogOpen(true)
  }

  const openEditDatasetDialog = (dataset: Dataset) => {
    setIsEditMode(true)
    setEditingDataset(dataset)
    setFormData({ name: dataset.name, size: dataset.size })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (isEditMode && editingDataset) {
      setDatasets((prev) =>
        prev.map((d) => d.id === editingDataset.id ? { ...d, ...formData } : d)
      )
    } else {
      const newDataset: Dataset = {
        id: Date.now(),
        name: formData.name,
        size: formData.size,
        uploaded: new Date().toISOString().slice(0, 10),
      }
      setDatasets((prev) => [newDataset, ...prev])
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setDatasets((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <div className="p-6 bg-muted/40 min-h-svh">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Data Library</h1>
          <p className="text-muted-foreground text-sm">Browse and manage your datasets.</p>
        </div>
        <Button onClick={openNewDatasetDialog}>New Dataset</Button>
      </div>

      <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="*:px-4">
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datasets.map((item) => (
              <TableRow key={item.id} className="*:px-4">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.uploaded}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDatasetDialog(item)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(item.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Dataset" : "New Dataset"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update dataset details."
                : "Fill out the form to create a new dataset."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Dataset Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="File Size (e.g. 15MB)"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>
              {isEditMode ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
