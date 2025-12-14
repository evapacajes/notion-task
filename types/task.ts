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
