"use client"

import { Search, Bell, Settings, User } from "lucide-react"
import { Input } from "@/components/ui/input"

interface TaskHeaderProps {
  onAddTask: () => void
}

export function TaskHeader({ onAddTask }: TaskHeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-2 max-w-md">
          <Search size={20} className="text-muted-foreground" />
          <Input placeholder="Buscar tareas..." className="border-0 bg-transparent placeholder-muted-foreground" />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <Bell size={20} className="text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <Settings size={20} className="text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <User size={16} className="text-primary-foreground" />
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
