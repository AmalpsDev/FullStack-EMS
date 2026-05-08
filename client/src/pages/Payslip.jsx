import { useState } from 'react'
import { Download, Eye, Printer, Filter, FileText } from 'lucide-react'
import { dummyPayslipData } from '../assets/assets'
import PayslipModal from '../components/PayslipModal'

function Payslip() {
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const filteredPayslips = dummyPayslipData.filter(payslip => {
    if (filterMonth && payslip.month !== parseInt(filterMonth)) return false;
    if (filterYear && payslip.year !== parseInt(filterYear)) return false;
    return true;
  });

  const handlePrint = (payslip) => {
    window.open(`/print/payslips/${payslip._id}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Payslips</h1>
        <p className="page-subtitle">View and manage your salary payslips</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Filter size={20} className="text-slate-600" />
          <h3 className="font-semibold text-slate-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-slate-700 mb-2">
              Month
            </label>
            <select
              id="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            >
              <option value="">All Months</option>
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-slate-700 mb-2">
              Year
            </label>
            <select
              id="year"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div>
            <button
              onClick={() => {
                setFilterMonth('');
                setFilterYear(new Date().getFullYear().toString());
              }}
              className="w-full mt-7 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-medium text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Payslips List */}
      {filteredPayslips.length > 0 ? (
        <div className="grid gap-4 md:gap-6">
          {filteredPayslips.map((payslip) => (
            <div key={payslip.id} className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">
                        {months[payslip.month - 1]?.label || 'Unknown'} {payslip.year}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">ID: {payslip.id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full">
                      Generated
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Basic Salary</p>
                    <p className="text-lg font-bold text-slate-900">₹{payslip.basicSalary.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Allowances</p>
                    <p className="text-lg font-bold text-emerald-600">+₹{payslip.allowances.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Deductions</p>
                    <p className="text-lg font-bold text-rose-600">-₹{payslip.deductions.toLocaleString()}</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <p className="text-xs text-indigo-600 font-medium uppercase tracking-wider mb-1">Net Salary</p>
                    <p className="text-xl font-bold text-indigo-900">₹{payslip.netSalary.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedPayslip(payslip)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all font-medium text-sm"
                >
                  <Eye size={18} />
                  View Details
                </button>
                <button
                  onClick={() => handlePrint(payslip)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all font-medium text-sm"
                >
                  <Printer size={18} />
                  Print
                </button>
                <button
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all font-medium text-sm"
                >
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-slate-400" size={32} />
          </div>
          <p className="text-slate-600 font-medium mb-1">No payslips found</p>
          <p className="text-sm text-slate-500">Try adjusting your filters</p>
        </div>
      )}

      {/* Payslip Detail Modal */}
      {selectedPayslip && (
        <PayslipModal payslip={selectedPayslip} onClose={() => setSelectedPayslip(null)} />
      )}
    </div>
  )
}

export default Payslip