import React, { useEffect, useState } from 'react'
import { useTodo } from '../store/useTodoStore.js'
import { 
  Plus, Search, CheckCircle2, Clock, ListTodo, MoreVertical, 
  Trash2, Edit2, X, LayoutDashboard, Calendar, Users, 
  Settings, HelpCircle, LogOut, Bell, Grid, ChevronDown, MessageSquare, AlertCircle
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
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('active') 
  
  // NEW: State to track the currently active sidebar navigation
  const [activeNav, setActiveNav] = useState('Tasks')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    priority: 'medium'
  })

  useEffect(() => {
    fetchTodos()
  }, [])

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (todo.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTab = activeTab === 'active' 
      ? (todo.status === 'Todo' || todo.status === 'In Progress')
      : todo.status === 'Completed'
    
    return matchesSearch && matchesTab
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

    setFormData({ title: '', description: '', priority: 'medium', status: 'Todo' })
    setIsModalOpen(false)
  }

  const handleEdit = (todo) => {
    setEditingTodo(todo)
    setFormData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority || 'medium',
      status: todo.status
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTodo(null)
    setFormData({ title: '', description: '', priority: 'medium', status: 'Todo' })
  }

  return (
    <div className="flex h-screen bg-[#F4F7FC] font-sans text-slate-800 overflow-hidden">
      <Toaster position="top-right" toastOptions={{ className: 'bg-white text-slate-800 shadow-lg rounded-xl', duration: 3000 }} />
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#F4F7FC] border-r border-slate-200/60 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight">TaskFlow</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Pro Workspace</p>
          </div>
          
          <nav className="px-4 space-y-2">
            {/* NEW: Pass the active state and onClick handlers to dynamically update navigation */}
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeNav === 'Dashboard'} onClick={() => setActiveNav('Dashboard')} />
            <NavItem icon={<ListTodo />} label="Tasks" active={activeNav === 'Tasks'} onClick={() => setActiveNav('Tasks')} />
            <NavItem icon={<Calendar />} label="Calendar" active={activeNav === 'Calendar'} onClick={() => setActiveNav('Calendar')} />
            <NavItem icon={<Users />} label="Team" active={activeNav === 'Team'} onClick={() => setActiveNav('Team')} />
            <NavItem icon={<Settings />} label="Settings" active={activeNav === 'Settings'} onClick={() => setActiveNav('Settings')} />
          </nav>
        </div>

        <div className="p-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 mb-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-600/20"
          >
            <Plus className="w-5 h-5" /> Create Task
          </button>
          
          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 text-slate-500 hover:text-slate-800 font-medium text-sm px-2 transition-colors">
              <HelpCircle className="w-4 h-4" /> Help
            </button>
            <button className="w-full flex items-center gap-3 text-slate-500 hover:text-slate-800 font-medium text-sm px-2 transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
        
        {/* TOP NAVIGATION */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-slate-200/60 bg-white/50 backdrop-blur-sm z-10">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100/80 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Overview</span>
            <span className="hover:text-slate-800 cursor-pointer pb-1 border-b-2 border-transparent">Reports</span>
            <span className="hover:text-slate-800 cursor-pointer pb-1 border-b-2 border-transparent">Archive</span>
          </div>

          <div className="flex items-center gap-5">
            <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors">
              New Project
            </button>
            <div className="flex items-center gap-4 text-slate-400">
              <Bell className="w-5 h-5 hover:text-slate-700 cursor-pointer transition-colors" />
              <Grid className="w-5 h-5 hover:text-slate-700 cursor-pointer transition-colors" />
              <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                <span className="text-emerald-700 font-bold text-xs">ME</span>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          
          {/* CONDITIONAL RENDERING: Render main app for Tasks/Dashboard, placeholder for everything else */}
          {activeNav === 'Tasks' || activeNav === 'Dashboard' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Tasks Overview</h1>
                  <p className="text-slate-500 font-medium">Manage and monitor your team's throughput</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                  <ListTodo className="w-4 h-4 text-slate-400" /> Week view
                </button>
              </div>

              {/* STATS WIDGETS */}
              <div className="flex flex-col lg:flex-row gap-5 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:w-1/3 flex flex-col justify-between">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Completion Rate</p>
                  <div className="mb-4">
                    <span className="text-5xl font-extrabold text-blue-600">{completionRate}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${completionRate}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-blue-600 h-full rounded-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 flex-1">
                  <StatCard icon={<ListTodo className="text-blue-500" />} title="Total Tasks" value={stats.total} />
                  <StatCard icon={<Clock className="text-amber-500" />} title="To Do" value={stats.pending} />
                  <StatCard icon={<MoreVertical className="text-indigo-500" />} title="In Progress" value={stats.inProgress} />
                  <StatCard icon={<CheckCircle2 className="text-emerald-500" />} title="Completed" value={stats.completed} />
                </div>
              </div>

              {/* TASK FILTERS */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-slate-100/50 p-2 rounded-2xl">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTab('active')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === 'active' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200/50'
                    }`}
                  >
                    Active Tasks
                  </button>
                  <button 
                    onClick={() => setActiveTab('completed')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === 'completed' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200/50'
                    }`}
                  >
                    Completed
                  </button>
                </div>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 mt-4 sm:mt-0">
                  <ListTodo className="w-4 h-4 text-slate-400" /> 
                  Priority: High to Low 
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* TASKS GRID */}
              {isLoadingTodos ? (
                <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
              ) : filteredTodos.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                  <p className="text-slate-500 font-medium">No tasks found in this view.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
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
            </motion.div>
          ) : (
            // NEW: "Feature Coming Soon" Placeholder View
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="h-full flex flex-col items-center justify-center text-center mt-20"
            >
              <div className="w-24 h-24 bg-white border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <AlertCircle className="w-10 h-10 text-slate-300" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">{activeNav}</h2>
              <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
                The {activeNav.toLowerCase()} module is currently under development. This feature will be available in an upcoming release.
              </p>
              <button 
                onClick={() => setActiveNav('Tasks')}
                className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl shadow-sm transition-all"
              >
                Return to Tasks
              </button>
            </motion.div>
          )}
        </main>
      </div>

      <AddEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingTodo}
      />
    </div>
  )
}

/* --- Sub-Components --- */

// NEW: Updated NavItem to be a button with an onClick handler
const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-left ${
      active ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-800'
    }`}
  >
    <div className={active ? 'text-blue-600' : 'text-slate-400'}>
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
    {label}
  </button>
)

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 border border-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
)

const TaskCard = ({ todo, onEdit, onDelete, onUpdateStatus }) => {
  const [showMenu, setShowMenu] = useState(false)

  const getBadgeStyle = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 uppercase';
      case 'low': return 'bg-slate-100 text-slate-600 uppercase';
      default: return 'bg-indigo-100 text-indigo-700 uppercase';
    }
  }

  const mockDate = "Oct 24, 2025"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 border-l-4 border-l-blue-600 hover:shadow-md transition-all relative flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider ${getBadgeStyle(todo.priority)}`}>
          {todo.priority || 'Task'}
        </span>
        
        <div className="flex -space-x-2">
          <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex justify-center items-center overflow-hidden"><img src="https://i.pravatar.cc/100?img=11" alt="user" /></div>
          <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-300 flex justify-center items-center overflow-hidden"><img src="https://i.pravatar.cc/100?img=12" alt="user" /></div>
        </div>
      </div>

      <div className="flex justify-between items-start mb-2 gap-4">
        <h3 className={`text-lg font-bold text-slate-900 leading-tight ${todo.status === 'Completed' ? 'line-through opacity-60' : ''}`}>
          {todo.title}
        </h3>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="p-1 text-slate-400 hover:text-slate-800 rounded-md">
            <MoreVertical className="w-5 h-5" />
          </button>
          <AnimatePresence>
            {showMenu && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute right-0 top-8 bg-white border border-slate-100 shadow-xl rounded-xl py-2 w-32 z-20">
                <button onClick={() => { onEdit(todo); setShowMenu(false) }} className="w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Edit2 className="w-4 h-4"/> Edit</button>
                <button onClick={() => { onDelete(todo._id); setShowMenu(false) }} className="w-full px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 className="w-4 h-4"/> Delete</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {todo.description && (
        <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1 line-clamp-3">
          {todo.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {mockDate}</span>
          <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> 2</span>
        </div>

        <select
          value={todo.status}
          onChange={(e) => onUpdateStatus(todo._id, e.target.value)}
          className="bg-slate-50 border-none font-bold text-xs text-slate-700 py-1.5 px-3 rounded-lg cursor-pointer focus:ring-0 outline-none hover:bg-slate-100 transition-colors"
        >
          <option value="Todo">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </motion.div>
  )
}

const AddEditModal = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditing }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-800 shadow-sm border border-slate-100"><X className="w-4 h-4"/></button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Task Title</label>
            <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium" placeholder="E.g. API Integration..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none" rows="3" placeholder="Add task details..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
              <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            {isEditing && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="Todo">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}
          </div>
          <button type="submit" className="w-full mt-4 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all">
            {isEditing ? 'Save Changes' : 'Create Task'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default DashBoardPage