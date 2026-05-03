import { useForm } from "react-hook-form"
import { X } from "lucide-react"
import { useEffect } from "react"

function AddEmployeeModal({ isOpen, onClose, onAdd, employee }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (employee) {
      reset(employee)
    } else {
      reset({ name: "", email: "", role: "", department: "" })
    }
  }, [employee, reset, isOpen])

  if (!isOpen) return null

  const onSubmit = (data) => {
    // If editing, merge new data with existing employee; otherwise, create new
    onAdd(employee ? { ...employee, ...data } : { ...data, id: Date.now() })
    reset()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-3.5 rounded-2xl border ${errors.name ? 'border-red-500 bg-red-50/50' : 'border-slate-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
              placeholder="e.g. John Doe"
            />
            {errors.name && <p className="text-xs text-red-500 ml-1 font-medium">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <input
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              className={`w-full px-4 py-3.5 rounded-2xl border ${errors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 ml-1 font-medium">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Role</label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white cursor-pointer"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="UI Designer">UI Designer</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Department</label>
              <input
                {...register("department", { required: "Department is required" })}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                placeholder="e.g. Engineering"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-50">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">Cancel</button>
            <button type="submit" className="flex-1 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]">
              {employee ? 'Update Changes' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployeeModal