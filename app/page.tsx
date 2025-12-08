"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TaskHeader } from "@/components/task-header"
import { TaskBoard } from "@/components/task-board"
import { AddTaskModal } from "@/components/add-task-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TaskHeader onAddTask={() => setIsModalOpen(true)} />

        <div className="flex-1 overflow-auto">
          <TaskBoard />
        </div>
      </div>

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
