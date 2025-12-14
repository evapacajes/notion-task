"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Task } from "./task-board"

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAddTask: (task: Omit<Task, "id">) => void
}

export function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "high" | "medium" | "low",
    status: "todo" as "todo" | "in-progress" | "done",
    dueDate: "",
    tags: [] as string[],
    assignee: "",
  })
  const [tagInput, setTagInput] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTask({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      tags: formData.tags,
      assignee: formData.assignee || undefined,
    })
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      dueDate: "",
      tags: [],
      assignee: "",
    })
    setTagInput("")
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-card border border-border rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 hover:bg-muted rounded-lg transition">
          <X size={20} className="text-foreground" />
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-6">Nueva Tarea</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Título</label>
            <Input
              placeholder="Ingresa el título de la tarea"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-input border border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Descripción</label>
            <textarea
              placeholder="Describe la tarea en detalle"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Prioridad</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Estado</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
            >
              <option value="todo">Por Hacer</option>
              <option value="in-progress">En Progreso</option>
              <option value="done">Completada</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Fecha de vencimiento</label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="bg-input border border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Etiquetas</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Agregar etiqueta"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                className="bg-input border border-border flex-1"
              />
              <Button type="button" onClick={handleAddTag} variant="outline" className="bg-transparent">
                Agregar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg"
                >
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-primary/70">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Asignar a</label>
            <Input
              placeholder="Nombre de la persona"
              value={formData.assignee}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
              className="bg-input border border-border"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:opacity-90">
              Crear Tarea
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
