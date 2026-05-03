import { Link } from "react-router-dom"
import { ArrowRight, CalendarDays, Clock } from "lucide-react"

function EmployeeDshboard({ data }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Employee Dashboard
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Welcome back! Here is your overview for today.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <h3 className="font-semibold text-slate-900 mb-2">Account Overview</h3>
          <p className="text-sm text-slate-500 mt-1">Status: Active</p>
          <p className="text-xs text-indigo-600 font-medium mt-2">Employee ID: #EMS-1234</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100">
        <Link 
          to="/attendence" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-[0.98] group"
        >
          <Clock size={18} />
          Mark Attendance
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          to="/leave" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 bg-white text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm active:scale-[0.98]"
        >
          <CalendarDays size={18} />
          Apply for Leave
        </Link>
      </div>
    </div>
  )
}

export default EmployeeDshboard