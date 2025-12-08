"use client"

import { Calendar, Flag, Tag } from "lucide-react"
import type { Task } from "./task-board"

interface TaskCardProps {
  task: Task
}

const priorityStyles = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

const priorityLabels = {
  high: "Alto",
  medium: "Medio",
  low: "Bajo",
}

export function TaskCard({ task }: TaskCardProps) {
  const dueDate = new Date(task.dueDate)
  const today = new Date()
  const isOverdue = dueDate < today && task.status !== "done"

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition line-clamp-2">
          {task.title}
        </h3>
        <Flag
          size={16}
          className={`flex-shrink-0 ml-2 ${
            task.priority === "high"
              ? "text-red-500 fill-red-500"
              : task.priority === "medium"
                ? "text-amber-500 fill-amber-500"
                : "text-blue-500"
          }`}
        />
      </div>

      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded"
          >
            <Tag size={12} />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar size={14} />
          {dueDate.toLocaleDateString("es-ES", { month: "short", day: "numeric" })}
          {isOverdue && <span className="text-red-500 font-semibold ml-1">Vencido</span>}
        </div>

        {task.assignee && (
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">{task.assignee[0]}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${priorityStyles[task.priority]}`}>
          Prioridad {priorityLabels[task.priority]}
        </span>
      </div>
    </div>
  )
}
