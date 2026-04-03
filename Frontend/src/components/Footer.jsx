import React from 'react'
import { CheckSquare, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <CheckSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold">TaskFlow</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              The modern task management platform that helps teams stay organized, focused, and productive.
            </p>
            <div className="flex gap-4">
              <a href="#twitter" className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#linkedin" className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#github" className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#email" className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-slate-400 hover:text-cyan-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-cyan-400 transition-colors">Pricing</a></li>
              <li><a href="#integrations" className="text-slate-400 hover:text-cyan-400 transition-colors">Integrations</a></li>
              <li><a href="#changelog" className="text-slate-400 hover:text-cyan-400 transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#careers" className="text-slate-400 hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#blog" className="text-slate-400 hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 TaskFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#privacy" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#terms" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#cookies" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer