import { useState, useEffect } from "react"
import { dummyEmployeeDashboardData } from "../assets/assets"
import Loading from "../components/Loading"
import AdminDashboard from "../components/AdminDashboard"
import EmployeeDshboard from "../components/EmployeeDshboard"

function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(dummyEmployeeDashboardData)
    setTimeout(()=>{
      setLoading(false)
    },1000)
  }, [])

  if (loading) return <Loading />
  if(!data) return <p>Failed to load dashboard</p>

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />
  }

  return <EmployeeDshboard data={data} />
}

export default Dashboard