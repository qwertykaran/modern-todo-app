"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Check, Trash2, Edit3, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  priority: "LOW" | "MEDIUM" | "HIGH"
  createdAt: string
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({ title: "", description: "", priority: "MEDIUM" as const })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingTodo, setEditingTodo] = useState({ title: "", description: "", priority: "MEDIUM" as const })
  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ALL")
  const [loading, setLoading] = useState(false)

  // Mock API calls - replace with actual Spring Boot endpoints
  const API_BASE = "http://localhost:8080/api/todos"

  const fetchTodos = async () => {
    setLoading(true)
    try {
      // Mock data for demo
      const mockTodos: Todo[] = [
        {
          id: 1,
          title: "Complete project documentation",
          description: "Write comprehensive documentation for the new feature",
          completed: false,
          priority: "HIGH",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Review pull requests",
          description: "Review and approve pending pull requests",
          completed: true,
          priority: "MEDIUM",
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: "Update dependencies",
          description: "Update all project dependencies to latest versions",
          completed: false,
          priority: "LOW",
          createdAt: new Date().toISOString(),
        },
      ]
      setTodos(mockTodos)
    } catch (error) {
      console.error("Error fetching todos:", error)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async () => {
    if (!newTodo.title.trim()) return

    const todo: Todo = {
      id: Date.now(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      priority: newTodo.priority,
      createdAt: new Date().toISOString(),
    }

    setTodos((prev) => [todo, ...prev])
    setNewTodo({ title: "", description: "", priority: "MEDIUM" })
  }

  const toggleTodo = async (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = async (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditingTodo({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    })
  }

  const saveEdit = async () => {
    if (!editingTodo.title.trim()) return

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId
          ? { ...todo, title: editingTodo.title, description: editingTodo.description, priority: editingTodo.priority }
          : todo,
      ),
    )
    setEditingId(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingTodo({ title: "", description: "", priority: "MEDIUM" })
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ACTIVE") return !todo.completed
    if (filter === "COMPLETED") return todo.completed
    return true
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500"
      case "MEDIUM":
        return "bg-yellow-500"
      case "LOW":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Modern Todo List</h1>
          <p className="text-gray-600">Stay organized with style and animations</p>
        </motion.div>

        {/* Add Todo Form */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
          <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="What needs to be done?"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo((prev) => ({ ...prev, title: e.target.value }))}
                  className="flex-1"
                  onKeyPress={(e) => e.key === "Enter" && addTodo()}
                />
                <select
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo((prev) => ({ ...prev, priority: e.target.value as any }))}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
                <Button onClick={addTodo} className="px-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              <Input
                placeholder="Description (optional)"
                value={newTodo.description}
                onChange={(e) => setNewTodo((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </Card>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-2 mb-6">
          {(["ALL", "ACTIVE", "COMPLETED"] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType.toLowerCase()}
            </Button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-600">{todos.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-600">{todos.filter((t) => t.completed).length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-orange-600">{todos.filter((t) => !t.completed).length}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>
        </motion.div>

        {/* Todo List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTodos.map((todo, index) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    "p-4 shadow-md border-0 bg-white/80 backdrop-blur-sm transition-all duration-200",
                    todo.completed && "opacity-75",
                  )}
                >
                  <CardContent className="p-0">
                    {editingId === todo.id ? (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            value={editingTodo.title}
                            onChange={(e) => setEditingTodo((prev) => ({ ...prev, title: e.target.value }))}
                            className="flex-1"
                          />
                          <select
                            value={editingTodo.priority}
                            onChange={(e) => setEditingTodo((prev) => ({ ...prev, priority: e.target.value as any }))}
                            className="px-3 py-2 border rounded-md"
                          >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                          </select>
                        </div>
                        <Input
                          value={editingTodo.description}
                          onChange={(e) => setEditingTodo((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={saveEdit}>
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleTodo(todo.id)}
                          className={cn(
                            "mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                            todo.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-green-400",
                          )}
                        >
                          <AnimatePresence>
                            {todo.completed && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                <Check className="w-3 h-3 text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className={cn(
                                "font-medium transition-all duration-200",
                                todo.completed && "line-through text-gray-500",
                              )}
                            >
                              {todo.title}
                            </h3>
                            <Badge className={cn("text-xs", getPriorityColor(todo.priority))}>{todo.priority}</Badge>
                          </div>
                          {todo.description && (
                            <p
                              className={cn(
                                "text-sm text-gray-600 transition-all duration-200",
                                todo.completed && "line-through",
                              )}
                            >
                              {todo.description}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => startEdit(todo)}
                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteTodo(todo.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTodos.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {filter === "ALL"
                ? "No todos yet. Add one above!"
                : filter === "ACTIVE"
                  ? "No active todos!"
                  : "No completed todos!"}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
