import React, { useEffect, useState } from 'react'
import { useTodo } from '../store/useTodoStore.js'
import { 
  Plus, Search, CheckCircle2, Clock, ListTodo, MoreHorizontal, 
  Trash2, Edit2, X, LayoutGrid, LogOut, Calendar, 
  Activity, Circle, CheckSquare, AlertOctagon, ChevronDown
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Toaster } from 'react-hot-toast'

const DashBoardPage = () => {
  const todos = useTodo((state) => state.todos)
  const isLoadingTodos = useTodo((state) => state.isLoadingTodos)
  const isCreatingTodo = useTodo((state) => state.isCreatingTodo)
  const isUpdatingTodo = useTodo((state) => state.isUpdatingTodo)
  
  const fetchTodos = useTodo((state) => state.fetchTodos)
  const addTodo = useTodo((state) => state.addTodo)
  const updateTodo = useTodo((state) => state.updateTodo)
  const updateStatus = useTodo((state) => state.updateStatus)
  const deleteTodo = useTodo((state) => state.deleteTodo)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    priority: 'medium',
    endDate: ''
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
    todo: todos.filter(t => t.status === 'Todo').length,
    active: todos.filter(t => t.status === 'In Progress').length,
    done: todos.filter(t => t.status === 'Completed').length,
  }
  const velocity = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.endDate) return

    if (editingTodo) {
      await updateTodo(editingTodo._id, formData)
      setEditingTodo(null)
    } else {
      await addTodo(formData)
    }

    setFormData({ title: '', description: '', priority: 'medium', status: 'Todo', endDate: '' })
    setIsModalOpen(false)
  }

  const handleEdit = (todo) => {
    setEditingTodo(todo)
    const formattedDate = todo.endDate ? new Date(todo.endDate).toISOString().split('T')[0] : ''
    
    setFormData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority || 'medium',
      status: todo.status,
      endDate: formattedDate
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTodo(null)
    setFormData({ title: '', description: '', priority: 'medium', status: 'Todo', endDate: '' })
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 flex flex-col">
      <Toaster position="top-right" toastOptions={{ className: 'bg-white text-slate-800 shadow-xl rounded-2xl border border-slate-100', duration: 3000 }} />
      
      {/* TOP NAVIGATION */}
      <header className="h-20 px-6 md:px-10 flex items-center justify-between border-b border-slate-200/60 bg-white sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <CheckSquare className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">TaskFlow</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            <LayoutGrid className="w-4 h-4" /> Dashboard
          </button>
          <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-10 py-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Tasks Overview</h2>
            <p className="text-slate-500 font-medium">Streamline your workflow and monitor project velocity.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors shadow-lg shadow-blue-600/20 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" /> Create New Task
          </button>
        </div>

        {/* STATS ROW (5 Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <StatCard icon={<ListTodo className="w-4 h-4 text-slate-500" />} iconBg="bg-slate-100" label="TOTAL" value={stats.total.toString().padStart(2, '0')} />
          <StatCard icon={<Clock className="w-4 h-4 text-orange-500" />} iconBg="bg-orange-50" label="TO DO" value={stats.todo.toString().padStart(2, '0')} />
          <StatCard icon={<Circle className="w-4 h-4 text-blue-500" />} iconBg="bg-blue-50" label="ACTIVE" value={stats.active.toString().padStart(2, '0')} />
          <StatCard icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} iconBg="bg-emerald-50" label="DONE" value={stats.done.toString().padStart(2, '0')} />
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100/60 flex flex-col justify-between col-span-2 md:col-span-1">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <Activity className="w-4 h-4 text-indigo-500" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">VELOCITY</span>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">{velocity}%</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${velocity}%` }} transition={{ duration: 1 }} className="bg-slate-900 h-full rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS ROW */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across your workspace..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100/60 shadow-sm rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <select 
                value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none px-6 py-4 pr-12 bg-white border border-slate-100/60 shadow-sm rounded-2xl text-sm font-bold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-40"
              >
                <option value="all">All Statuses</option>
                <option value="Todo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}
                className="appearance-none px-6 py-4 pr-12 bg-white border border-slate-100/60 shadow-sm rounded-2xl text-sm font-bold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-40"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* TASK GRID */}
        {isLoadingTodos ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div></div>
        ) : filteredTodos.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 font-medium text-lg">No tasks found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            <AnimatePresence mode="popLayout">
              {filteredTodos.map((todo) => (
                <TaskCard 
                  key={todo._id} 
                  todo={todo} 
                  onEdit={handleEdit} 
                  onDelete={deleteTodo} 
                  onUpdateStatus={updateStatus} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-200/60 bg-[#FAFAFA] py-8 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
          <div className="w-5 h-5 bg-slate-200 rounded text-slate-500 flex items-center justify-center"><CheckSquare className="w-3 h-3" /></div>
          TaskFlow
        </div>
        <div className="flex gap-6 text-xs font-semibold text-slate-400">
          <span>© 2024 TaskFlow Workspace</span>
          <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
        </div>
      </footer>

      {/* MODAL */}
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

/* --- Sub-Components --- */

const StatCard = ({ icon, iconBg, label, value }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100/60 flex flex-col justify-between min-h-[140px]">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-4xl font-extrabold text-slate-900 tracking-tight">{value}</p>
  </div>
)

const TaskCard = ({ todo, onEdit, onDelete, onUpdateStatus }) => {
  const [showMenu, setShowMenu] = useState(false)

  // OVERDUE LOGIC (From previous implementation)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const taskEndDate = todo.endDate ? new Date(todo.endDate) : null
  if (taskEndDate) taskEndDate.setHours(0, 0, 0, 0)
  
  const isOverdue = taskEndDate && taskEndDate < today && todo.status !== 'Completed'
  const isCompleted = todo.status === 'Completed'
  const isDisabled = isOverdue || isCompleted

  const getBadgeStyle = (priority) => {
    switch (priority) {
      case 'high': return 'bg-orange-50 text-orange-600';
      case 'medium': return 'bg-blue-50 text-blue-600';
      case 'low': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  }

  const displayDate = todo.endDate 
    ? new Date(todo.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'No Date'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100/80 flex flex-col h-full relative transition-all ${isOverdue ? 'opacity-80' : 'hover:shadow-md'}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-2">
          <span className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${getBadgeStyle(todo.priority)}`}>
            {todo.priority} Priority
          </span>
          {isOverdue && (
             <span className="px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-wider bg-red-50 text-red-600 uppercase flex items-center gap-1">
               <AlertOctagon className="w-3 h-3" /> Overdue
             </span>
          )}
        </div>
        
        {/* Menu */}
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-slate-400 hover:text-slate-800 transition-colors p-1">
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <AnimatePresence>
            {showMenu && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute right-0 top-8 bg-white border border-slate-100 shadow-xl rounded-2xl py-2 w-36 z-20">
                {!isOverdue && (
                  <button onClick={() => { onEdit(todo); setShowMenu(false) }} className="w-full px-4 py-2 text-left text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"><Edit2 className="w-4 h-4"/> Edit Task</button>
                )}
                <button onClick={() => { onDelete(todo._id); setShowMenu(false) }} className="w-full px-4 py-2 text-left text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"><Trash2 className="w-4 h-4"/> Delete Task</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <h3 className={`text-xl font-bold text-slate-900 mb-3 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
        {todo.title}
      </h3>
      
      {todo.description && (
        <p className={`text-sm leading-relaxed mb-8 flex-1 ${isOverdue ? 'text-slate-400' : 'text-slate-500'}`}>
          {todo.description}
        </p>
      )}

      {/* Bottom Metadata */}
      <div className="flex items-center justify-between mb-6">
        <div className={`flex items-center gap-2 text-xs font-bold ${isOverdue ? 'text-red-500' : 'text-slate-400'}`}>
          <Calendar className="w-4 h-4" /> 
          {displayDate}
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
          JD
        </div>
      </div>

      {/* Full Width Status Select inside Card */}
      <div className="relative w-full">
        <select
          value={todo.status}
          onChange={(e) => onUpdateStatus(todo._id, e.target.value)}
          disabled={isDisabled}
          className={`w-full appearance-none px-5 py-4 rounded-2xl text-sm font-bold transition-all outline-none ${
            isDisabled 
              ? 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100' 
              : 'bg-white border border-slate-200 text-slate-900 cursor-pointer hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          }`}
        >
          <option value="Todo">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <ChevronDown className={`absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDisabled ? 'text-slate-300' : 'text-slate-400'}`} />
      </div>
    </motion.div>
  )
}

const AddEditModal = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditing, isLoading }) => {
  if (!isOpen) return null

  const todayFormatted = new Date().toISOString().split('T')[0]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden border border-slate-100"
      >
        <div className="px-8 py-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">{isEditing ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"><X className="w-5 h-5"/></button>
        </div>

        <form onSubmit={onSubmit} className="px-8 pb-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Task Title</label>
            <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-bold placeholder:font-medium placeholder:text-slate-400" placeholder="E.g. Database schema update" />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none font-medium placeholder:text-slate-400" rows="3" placeholder="Add task details here..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Deadline</label>
              <input 
                required 
                type="date" 
                min={isEditing ? undefined : todayFormatted} 
                value={formData.endDate} 
                onChange={(e) => setFormData({...formData, endDate: e.target.value})} 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-bold" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Priority</label>
              <div className="relative">
                <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full appearance-none px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none">
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {isEditing && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Status</label>
              <div className="relative">
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full appearance-none px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none">
                  <option value="Todo">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          )}
          
          <button type="submit" disabled={isLoading} className="w-full mt-4 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex justify-center">
            {isLoading ? 'Processing...' : (isEditing ? 'Save Changes' : 'Create Task')}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default DashBoardPage