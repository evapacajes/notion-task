"use client"

import { TaskCard } from "./task-card"

export interface Task {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "todo" | "in-progress" | "done"
  dueDate: string
  tags: string[]
  assignee?: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Diseñar nueva interfaz",
    description: "Crear mockups para la nueva página de inicio",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-12-15",
    tags: ["Diseño", "UI/UX"],
    assignee: "Juan",
  },
  {
    id: "2",
    title: "Revisar propuesta de cliente",
    description: "Validar cambios solicitados en el proyecto",
    priority: "high",
    status: "todo",
    dueDate: "2024-12-10",
    tags: ["Cliente", "Revisión"],
    assignee: "María",
  },
  {
    id: "3",
    title: "Optimizar base de datos",
    description: "Mejorar consultas lentes",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-12-20",
    tags: ["Backend", "Performance"],
  },
  {
    id: "4",
    title: "Documentar API",
    description: "Escribir documentación completa",
    priority: "low",
    status: "todo",
    dueDate: "2024-12-25",
    tags: ["Documentación"],
  },
  {
    id: "5",
    title: "Implementar autenticación",
    description: "Agregar OAuth y 2FA",
    priority: "high",
    status: "done",
    dueDate: "2024-12-05",
    tags: ["Seguridad", "Backend"],
  },
  {
    id: "6",
    title: "Testing de componentes",
    description: "Escribir tests unitarios",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-12-18",
    tags: ["Testing", "QA"],
  },
]

interface TaskBoardProps {
  tasks: Task[]
}

export function TaskBoard({ tasks }: TaskBoardProps) {
  const allTasks = [...mockTasks, ...tasks]

  const columns = {
    todo: allTasks.filter((t) => t.status === "todo"),
    "in-progress": allTasks.filter((t) => t.status === "in-progress"),
    done: allTasks.filter((t) => t.status === "done"),
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Columna: Por Hacer */}
        <div className="bg-muted/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <h2 className="font-semibold text-foreground">Por Hacer</h2>
            <span className="ml-auto text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
              {columns.todo.length}
            </span>
          </div>
          <div className="space-y-3">
            {columns.todo.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Columna: En Progreso */}
        <div className="bg-muted/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-pink-400"></div>
            <h2 className="font-semibold text-foreground">En Progreso</h2>
            <span className="ml-auto text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
              {columns["in-progress"].length}
            </span>
          </div>
          <div className="space-y-3">
            {columns["in-progress"].map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Columna: Completadas */}
        <div className="bg-muted/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <h2 className="font-semibold text-foreground">Completadas</h2>
            <span className="ml-auto text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
              {columns.done.length}
            </span>
          </div>
          <div className="space-y-3">
            {columns.done.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
