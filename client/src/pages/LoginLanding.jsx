import { Link } from "react-router-dom"
import LoginLeftSide from "../components/LoginLeftSide"
import { ShieldIcon, UserIcon } from "lucide-react"


function LoginLanding() {
  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage employees, departments, payroll, and system configurations",
      icon: ShieldIcon
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "View your profile, track attendance, request time off, and access payslips.",
      icon: UserIcon
    },
  ]
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto bg-white">
        <div className="w-full max-w-md animate-fade-in relative z-10">
          {/*Header*/}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Please select your portal to continue.</p>
          </div>
          {/*Portal Options*/}
          <div className="grid gap-4">
            {portalOptions.map((option) => (
              <Link
                key={option.to}
                to={option.to}
                className="group relative flex items-start gap-4 p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <option.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {option.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginLanding
