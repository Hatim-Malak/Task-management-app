import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useTodo } from '../store/useTodoStore.js'
import { 
  Plus, 
  Search, 
  Loader2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ListTodo,
  MoreVertical,
  Trash2,
  Edit2,
  X,
  Calendar,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Toaster } from 'react-hot-toast'

const DashBoardPage = () => {
  const todos = useTodo((state) => state.todos)
const isLoadingTodos = useTodo((state) => state.isLoadingTodos)
const isCreatingTodo = useTodo((state) => state.isCreatingTodo)
const isUpdatingTodo = useTodo((state) => state.isUpdatingTodo)
const isDeletingTodo = useTodo((state) => state.isDeletingTodo)

const fetchTodos = useTodo((state) => state.fetchTodos)
const addTodo = useTodo((state) => state.addTodo)
const updateTodo = useTodo((state) => state.updateTodo)
const updateStatus = useTodo((state) => state.updateStatus)
const deleteTodo = useTodo((state) => state.deleteTodo)


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo'
  })

  useEffect(() => {
    fetchTodos()
  }, [])


  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (todo.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || todo.status === filterStatus
    const matchesPriority = filterPriority === 'all' || todo.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })


  const stats = {
    total: todos.length,
    pending: todos.filter(t => t.status === 'Todo').length,
    inProgress: todos.filter(t => t.status === 'In Progress').length,
    completed: todos.filter(t => t.status === 'Completed').length,
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    if (editingTodo) {
      await updateTodo(editingTodo._id, formData)
      setEditingTodo(null)
    } else {
      await addTodo(formData)
    }

    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending'
    })
    setIsModalOpen(false)
  }


  const handleEdit = (todo) => {
    setEditingTodo(todo)
    setFormData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      status: todo.status
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTodo(null)
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending'
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30">
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#334155',
          fontWeight: '500',
        },
        success: {
          iconTheme: {
            primary: '#06b6d4',
            secondary: '#fff',
          },
        },
      }} />
      
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">My Tasks Dashboard</h1>
              <p className="text-slate-600">Manage and organize your daily tasks efficiently</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add New Task
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                <ListTodo className="w-6 h-6 text-slate-700" />
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Total</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">{stats.total}</p>
            <p className="text-sm text-slate-600">All Tasks</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
            className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-orange-700 bg-orange-200 px-2 py-1 rounded-full">Pending</span>
            </div>
            <p className="text-3xl font-bold text-orange-900 mb-1">{stats.pending}</p>
            <p className="text-sm text-orange-700">To Start</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-700 bg-blue-200 px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-1">{stats.inProgress}</p>
            <p className="text-sm text-blue-700">In Progress</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-700 bg-green-200 px-2 py-1 rounded-full">Done</span>
            </div>
            <p className="text-3xl font-bold text-green-900 mb-1">{stats.completed}</p>
            <p className="text-sm text-green-700">Completed</p>
          </motion.div>


          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
            className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl p-6 shadow-lg shadow-cyan-500/30 text-white transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Rate</span>
            </div>
            <p className="text-3xl font-bold mb-1">{completionRate}%</p>
            <p className="text-sm text-cyan-100">Success Rate</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks by title or description..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all cursor-pointer font-medium"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all cursor-pointer font-medium"
            >
              <option value="all">All Priority</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {isLoadingTodos ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-cyan-200 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-cyan-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
              </div>
              <p className="text-slate-600 mt-6 font-medium">Loading your tasks...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ListTodo className="w-12 h-12 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' 
                  ? 'No tasks found' 
                  : 'No tasks yet'}
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                {searchQuery || filterStatus !== 'all' || filterPriority !== 'all'
                  ? 'Try adjusting your filters or search query to find what you\'re looking for'
                  : 'Start organizing your work by creating your first task. Click the button below to get started!'}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all inline-flex items-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40"
              >
                <Plus className="w-5 h-5" />
                Create Your First Task
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredTodos.map((todo, index) => (
                  <TodoCard
                    key={todo._id}
                    todo={todo}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={deleteTodo}
                    onUpdateStatus={updateStatus}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />

      <AddEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingTodo}
        isLoading={isCreatingTodo || isUpdatingTodo}
      />
    </div>
  )
}


const TodoCard = ({ todo, index, onEdit, onDelete, onUpdateStatus }) => {
  const [showMenu, setShowMenu] = useState(false)

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          border: 'border-red-200',
          dot: 'bg-red-500'
        }
      case 'medium':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          dot: 'bg-yellow-500'
        }
      case 'low':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          border: 'border-green-200',
          dot: 'bg-green-500'
        }
      default:
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-700',
          border: 'border-slate-200',
          dot: 'bg-slate-500'
        }
    }
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const priorityStyles = getPriorityStyles(todo.priority)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all group relative overflow-hidden"
    >

      <div className={`absolute top-0 left-0 w-full h-1 ${priorityStyles.dot}`}></div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-2">
          <h3 className={`font-bold text-lg text-slate-900 mb-2 line-clamp-2 ${
            todo.status === 'completed' ? 'line-through text-slate-500' : ''
          }`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
              {todo.description}
            </p>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-5 h-5 text-slate-500" />
          </button>
          
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute right-0 top-10 bg-white border-2 border-slate-200 rounded-xl shadow-xl py-2 min-w-[160px] z-20"
              >
                <button
                  onClick={() => {
                    onEdit(todo)
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 flex items-center gap-3 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Task
                </button>
                <button
                  onClick={() => {
                    onDelete(todo._id)
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Task
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${priorityStyles.border} ${priorityStyles.bg}`}>
          <div className={`w-2 h-2 rounded-full ${priorityStyles.dot}`}></div>
          <span className={`text-xs font-semibold uppercase ${priorityStyles.text}`}>
            {todo.priority}
          </span>
        </div>


        <select
          value={todo.status}
          onChange={(e) => onUpdateStatus(todo._id, e.target.value)}
          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 border ${getStatusStyles(todo.status)} transition-all`}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </motion.div>
  )
}

const AddEditModal = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditing, isLoading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {isEditing ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <p className="text-cyan-100 text-sm">
                      {isEditing ? 'Update your task details below' : 'Fill in the details to add a new task'}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={onSubmit} className="p-6 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter a descriptive task title"
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add more details about this task (optional)"
                    rows={4}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all resize-none"
                    disabled={isLoading}
                  />
                </div>

                {isEditing && (
                  <div>
                    <label htmlFor="status" className="block text-sm font-semibold text-slate-900 mb-2">
                      Status
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all cursor-pointer font-medium"
                      disabled={isLoading}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !formData.title.trim()}
                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        {isEditing ? (
                          <>
                            <Edit2 className="w-5 h-5" />
                            Update Task
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5" />
                            Create Task
                          </>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default DashBoardPage
