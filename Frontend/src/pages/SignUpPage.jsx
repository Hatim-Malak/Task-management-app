import React, { useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import Footer from '../components/Footer.jsx'
import { useAuth } from '../store/useAuthStore.js'
import { Mail, Lock, ArrowRight, Loader2, CheckCircle2, Zap, Shield, Users } from 'lucide-react'
import { motion } from 'motion/react'

const SignUpPage = () => {
    const { isSigningUp, signUp } = useAuth()
    const [FullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }
        const data = {
            fullName:FullName,
            email:email,
            password:password
        }
        const result = await signUp(data)
        
        if (!result) {
            setError(result.error || 'Login failed')
        }
    }

    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Boost productivity with instant task creation and updates"
        },
        {
            icon: Shield,
            title: "Secure & Private",
            description: "Enterprise-grade security keeps your data protected"
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Work together seamlessly with your entire team"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            
            <main className="flex-1 flex">
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-md"
                    >
                        <div className="mb-10">
                            <motion.h1 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl font-bold text-slate-900 mb-3"
                            >
                                Welcome back
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-slate-600"
                            >
                                Sign in to your account to continue managing your tasks
                            </motion.p>
                        </div>
                        <motion.form 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            onSubmit={handleSubmit} 
                            className="space-y-6"
                        >
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-900 mb-2">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                                    <input
                                        id="fullName"
                                        type="text"
                                        value={FullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all"
                                        disabled={isSigningUp}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                                    Email
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all"
                                        disabled={isSigningUp}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-900">
                                        Password
                                    </label>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all"
                                        disabled={isSigningUp}
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isSigningUp}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5"
                            >
                                {isSigningUp ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in to TaskFlow
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </motion.form>

                        {/* Sign Up Link */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-slate-600">
                                Don't have an account?{' '}
                                <a href="#signup" className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">
                                    Start free trial
                                </a>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Side - Hero Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
                            backgroundSize: '48px 48px'
                        }}></div>
                    </div>

                    {/* Gradient Orbs */}
                    <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-center px-16 py-12 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                                Manage tasks<br />like a pro
                            </h2>
                            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                                Join thousands of teams who trust TaskFlow to organize their work and boost productivity.
                            </p>

                            {/* Features */}
                            <div className="space-y-6">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-cyan-600/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-600/30 transition-colors">
                                            <feature.icon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">
                                                {feature.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                                className="mt-16 grid grid-cols-3 gap-8"
                            >
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">50K+</div>
                                    <div className="text-slate-400 text-sm">Active Users</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">1M+</div>
                                    <div className="text-slate-400 text-sm">Tasks Completed</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                                    <div className="text-slate-400 text-sm">Uptime</div>
                                </div>
                            </motion.div>

                            {/* Testimonial */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.6 }}
                                className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                            >
                                <p className="text-slate-300 mb-4 italic">
                                    "TaskFlow has completely transformed how our team manages projects. It's intuitive, powerful, and a joy to use every day."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        SJ
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm">Sarah Johnson</div>
                                        <div className="text-slate-400 text-xs">Product Manager at TechCorp</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SignUpPage
