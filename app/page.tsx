"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TaskHeader } from "@/components/task-header"
import { TaskBoard } from "@/components/task-board"
import { AddTaskModal } from "@/components/add-task-modal"
import type { Task } from "@/types/task"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    }
    console.log("[v0] Nueva tarea creada:", task)
    setTasks((prevTasks) => [...prevTasks, task])
    setIsModalOpen(false)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TaskHeader onAddTask={() => setIsModalOpen(true)} />

        <div className="flex-1 overflow-auto">
          <TaskBoard tasks={tasks} />
        </div>
      </div>

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTask={handleAddTask} />
    </div>
  )
}
