"use client"

import { Menu, Plus, CheckCircle2, Clock, AlertCircle, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { icon: CheckCircle2, label: "Completadas", color: "text-emerald-500" },
    { icon: Clock, label: "En Progreso", color: "text-blue-500" },
    { icon: AlertCircle, label: "Pendientes", color: "text-amber-500" },
    { icon: Archive, label: "Archivadas", color: "text-gray-500" },
  ]

  return (
    <>
      <button onClick={onToggle} className="fixed left-4 top-4 z-50 lg:hidden p-2 hover:bg-muted rounded-lg transition">
        <Menu size={24} className="text-foreground" />
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onToggle} />}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border
        transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto
      `}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 mt-12 lg:mt-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <CheckCircle2 size={24} className="text-sidebar-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">TaskFlow</h1>
          </div>

          <Button className="w-full mb-8 bg-sidebar-primary text-sidebar-primary-foreground hover:opacity-90">
            <Plus size={20} className="mr-2" />
            Nueva Tarea
          </Button>

          <div className="space-y-2 mb-8">
            <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-3">Vistas</p>
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent/50 transition text-sidebar-foreground group"
              >
                <item.icon size={20} className={item.color} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-sidebar-border pt-6">
            <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-3 mb-3">
              Espacios
            </p>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm rounded-lg hover:bg-sidebar-accent/50 transition text-sidebar-foreground">
              <div className="w-4 h-4 rounded bg-sidebar-accent"></div>
              Trabajo
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm rounded-lg hover:bg-sidebar-accent/50 transition text-sidebar-foreground">
              <div className="w-4 h-4 rounded bg-sidebar-accent"></div>
              Personal
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
