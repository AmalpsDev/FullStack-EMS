import { Users, FileText, Settings } from "lucide-react"
import { Link } from "react-router-dom"

function AdminDashboard({ data }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          System Overview and Management Portal.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Employees", value: "48", icon: Users, color: "text-blue-600" },
          { label: "Pending Leaves", value: "12", icon: FileText, color: "text-amber-600" },
          { label: "System Health", value: "Optimal", icon: Settings, color: "text-emerald-600" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-100">
        <Link to="/employees" className="text-indigo-600 font-semibold hover:text-indigo-700 underline-offset-4 hover:underline">
          Manage Workforce &rarr;
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard