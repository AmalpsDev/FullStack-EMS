import { useState, useEffect } from "react"
import { Clock, Calendar, CheckCircle2, UserCheck, Timer, Search, Filter } from "lucide-react"
import Loading from "../components/Loading"
import { dummyEmployeeDashboardData } from "../assets/assets"

function Attendence() {
  const [loading, setLoading] = useState(true)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [data, setData] = useState(null)

  // Dummy Logs for initial UI representation
  const logs = [
    { id: 1, date: "Oct 24, 2023", checkIn: "09:00 AM", checkOut: "18:00 PM", status: "Present", duration: "9h 00m" },
    { id: 2, date: "Oct 23, 2023", checkIn: "09:15 AM", checkOut: "18:05 PM", status: "Late", duration: "8h 50m" },
    { id: 3, date: "Oct 22, 2023", checkIn: "08:55 AM", checkOut: "17:50 PM", status: "Present", duration: "8h 55m" },
    { id: 4, date: "Oct 21, 2023", checkIn: "09:02 AM", checkOut: "18:10 PM", status: "Present", duration: "9h 08m" },
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    setData(dummyEmployeeDashboardData)
    
    setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearInterval(timer)
  }, [])

  if (loading) return <Loading />

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header with Live Clock */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Attendance Details</h1>
          <p className="text-slate-500 mt-1">Review your logs and manage your daily check-ins.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm min-w-[200px]">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-lg font-black text-slate-900 tabular-nums leading-none mb-1">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
              {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
            </p>
          </div>
        </div>
      </header>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Present Days", value: "18", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Late Entries", value: "02", icon: Timer, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Absent", value: "01", icon: Calendar, color: "text-red-600", bg: "bg-red-50" },
          { label: "Average Hours", value: "8.5h", icon: UserCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Check-In Action Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Record your presence</h2>
            <p className="text-slate-400 max-w-sm text-sm">Capture your current check-in/out time to maintain your work history.</p>
          </div>
          
          <button 
            onClick={() => setIsCheckedIn(!isCheckedIn)}
            className={`group relative flex items-center gap-4 px-10 py-6 rounded-3xl font-bold text-xl transition-all duration-300 active:scale-95 ${
              isCheckedIn 
              ? "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white" 
              : "bg-white text-slate-900 hover:bg-indigo-600 hover:text-white"
            }`}
          >
            <div className={`w-4 h-4 rounded-full ${isCheckedIn ? 'bg-red-500 group-hover:bg-white' : 'bg-emerald-500 group-hover:bg-white'} animate-pulse`} />
            {isCheckedIn ? "Finish Day (Clock Out)" : "Start Shift (Clock In)"}
          </button>
        </div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -mb-48 -mr-48"></div>
      </div>

      {/* Logs Section */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h3 className="text-xl font-bold text-slate-900">Attendance History</h3>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search date..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 transition-all w-full sm:w-64" 
              />
            </div>
            <button className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Duration</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {logs.map((log) => (
                <tr key={log.id} className="group hover:bg-indigo-50/20 transition-all">
                  <td className="px-6 py-5 font-bold text-slate-700 bg-slate-50/50 group-hover:bg-transparent rounded-l-2xl border-y border-l border-transparent group-hover:border-indigo-100">{log.date}</td>
                  <td className="px-6 py-5 text-slate-500 bg-slate-50/50 group-hover:bg-transparent border-y border-transparent group-hover:border-indigo-100">{log.checkIn}</td>
                  <td className="px-6 py-5 text-slate-500 bg-slate-50/50 group-hover:bg-transparent border-y border-transparent group-hover:border-indigo-100">{log.checkOut}</td>
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-transparent border-y border-transparent group-hover:border-indigo-100">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      log.status === "Present" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-900 text-right bg-slate-50/50 group-hover:bg-transparent rounded-r-2xl border-y border-r border-transparent group-hover:border-indigo-100">{log.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Attendence