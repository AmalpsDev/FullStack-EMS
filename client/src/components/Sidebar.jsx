import { useState, useEffect } from 'react';
import { useLocation, NavLink, Link } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CalendarDays, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { dummyProfileData } from '../assets/assets'

function Sidebar({ role = "ADMIN", isCollapsed, setIsCollapsed }) {

  const { pathname } = useLocation();
  const [userName, setUserName] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setUserName(dummyProfileData.firstName + ' ' + dummyProfileData.lastName);
  }, [])

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname])

  const handleLogOut = () => {
    window.location.href = '/login';
  }

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'EMPLOYEE'] },
    { label: 'Employees', path: '/employees', icon: Users, roles: ['ADMIN'] },
    { label: 'Attendance', path: '/attendence', icon: Clock, roles: ['ADMIN', 'EMPLOYEE'] },
    { label: 'Leave', path: '/leave', icon: CalendarDays, roles: ['ADMIN', 'EMPLOYEE'] },
    { label: 'Payslip', path: '/payslip', icon: FileText, roles: ['ADMIN', 'EMPLOYEE'] },
    { label: 'Settings', path: '/settings', icon: Settings, roles: ['ADMIN', 'EMPLOYEE'] },
  ].filter(item => item.roles.includes(role.toUpperCase()));



  return (
    <>
      {/* Mobile Navbar Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center px-4 z-30">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Menu size={24} />
        </button>
        <span className="ml-4 font-bold text-slate-900 tracking-tight">EMS Pro</span>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 bg-indigo-950 text-slate-300 flex flex-col transition-all duration-300 ease-in-out border-r border-indigo-900/50
        ${isCollapsed ? 'md:w-20' : 'md:w-72'} w-72
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand / Logo Section */}
        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
              <Users size={24} />
            </div>
            {!isCollapsed && <span className="text-xl font-bold text-white tracking-tight">EMS Pro</span>}
          </Link>
          
          <div className="flex items-center">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className="hidden md:flex p-1.5 rounded-lg bg-indigo-900/50 text-slate-400 hover:text-white transition-colors ml-2"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu size={18} />
            </button>
            <button onClick={() => setMobileOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : `hover:bg-indigo-900/50 hover:text-white ${!isCollapsed && 'hover:translate-x-1'}`}
              `}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={20} className="shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Account & Actions */}
        <div className={`p-4 mt-auto border-t border-indigo-900/50 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-12' : 'gap-3 p-3'} rounded-2xl bg-indigo-900/30 mb-4 border border-indigo-800/20`}>
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-indigo-500/20 shrink-0">
              {userName.charAt(0)}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{userName}</p>
                <p className="text-xs text-indigo-400 truncate font-medium">
                  {role.toUpperCase() === 'ADMIN' ? 'Administrator' : 'Employee'}
                </p>
              </div>
            )}
          </div>

          <button 
            onClick={handleLogOut}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} w-full py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200 group`}
            title={isCollapsed ? "Sign Out" : "" }
          >
            <LogOut size={20} className={`${!isCollapsed && 'group-hover:-translate-x-1'} transition-transform`} />
            {!isCollapsed && <span className="font-medium text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar