import { useState, useCallback, useEffect, useMemo } from 'react'
import { dummyEmployeeDashboardData } from "../assets/assets"
import Loading from "../components/Loading"
import { Search, UserPlus, Mail, Briefcase, Filter, Edit, Trash2 } from "lucide-react"
import AddEmployeeModal from "../components/AddEmployeeModal"

function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)

  const fetchEmployees = useCallback(async () => {
    setLoading(true)
    // Mocking an array for the list view
    const data = [
      { id: 1, name: "Amal", role: "Admin", email: "admin@ems.com", department: "Management" },
      { id: 2, name: "John Doe", role: "Software Engineer", email: "john@ems.com", department: "Engineering" },
      { id: 3, name: "Jane Smith", role: "Product Manager", email: "jane@ems.com", department: "Product" },
      { id: 4, name: "Sarah Williams", role: "UI Designer", email: "sarah@ems.com", department: "Design" }
    ]
    setEmployees(data)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRole = selectedRole === "All" || emp.role === selectedRole
      
      return matchesSearch && matchesRole
    })
  }, [employees, searchTerm, selectedRole])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(prev => prev.filter(emp => emp.id !== id))
    }
  }

  const handleEdit = (employee) => {
    setEditingEmployee(employee)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingEmployee(null)
    setIsModalOpen(true)
  }

  const handleSave = (employeeData) => {
    if (editingEmployee) {
      setEmployees(prev => prev.map(emp => emp.id === employeeData.id ? employeeData : emp))
    } else {
      setEmployees(prev => [employeeData, ...prev])
    }
  }

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Employees</h1>
          <p className="text-slate-500 mt-1">Directory of all staff members and their profiles.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 group"
        >
          <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
          Add New Employee
        </button>
      </div>

      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleSave}
        employee={editingEmployee}
      />

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Expanded Search Bar */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search name or role..."
            className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-2xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Role Filter Dropdown */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Filter size={16} />
          </div>
          <select
            className="block w-full pl-11 pr-10 py-3.5 border border-slate-200 rounded-2xl leading-5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm cursor-pointer appearance-none shadow-sm transition-all"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="UI Designer">UI Designer</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Employee Cards Grid */}
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group relative">
              {/* Actions Overlay */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleEdit(employee); }}
                  className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm border border-slate-100 transition-all hover:scale-110 active:scale-90"
                  title="Edit Employee"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(employee.id); }}
                  className="p-2 bg-white text-slate-400 hover:text-red-500 rounded-xl shadow-sm border border-slate-100 transition-all hover:scale-110 active:scale-90"
                  title="Delete Employee"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex flex-col items-center">
                {/* Profile Avatar Placeholder */}
                <div className="w-20 h-20 bg-linear-to-tr from-indigo-50 to-slate-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-105 transition-transform duration-300 ring-4 ring-slate-50">
                  <span className="text-2xl font-bold">
                    {employee.name?.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <div className="text-center w-full">
                  <h3 className="text-lg font-bold text-slate-900 truncate">{employee.name}</h3>
                  <p className="text-sm font-medium text-indigo-600 mb-4">{employee.role}</p>
                </div>
                
                <div className="w-full space-y-2.5 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <Mail size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <Briefcase size={14} className="text-slate-400 shrink-0" />
                    <span>{employee.department || "Operations"}</span>
                  </div>
                </div>

                <button className="mt-6 w-full py-2 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">No records found for "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}

export default Employees