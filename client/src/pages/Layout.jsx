import { useState } from "react"
import Sidebar  from "../components/Sidebar"
import { Outlet } from "react-router-dom"

function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className={`transition-all duration-300 ${isCollapsed ? "md:ml-20" : "md:ml-72"}`}>
            <div className="p-4 pt-16 sm:p-6 lg:p-8 max-w-400 mx-auto">
                <Outlet />
            </div>
        </main>
    </div>
  )
}

export default Layout