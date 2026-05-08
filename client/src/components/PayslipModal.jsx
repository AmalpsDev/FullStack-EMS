import { X, Download, Printer } from 'lucide-react'

function PayslipModal({ payslip, onClose }) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrint = () => {
    window.open(`/print/payslips/${payslip._id}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5 flex items-center justify-between border-b border-indigo-700">
          <h2 className="text-xl font-bold text-white">Payslip Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-indigo-600/50 text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Company & Employee Info */}
          <div className="mb-8 pb-6 border-b border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Company Details</p>
                <div className="space-y-2">
                  <p className="font-bold text-slate-900 text-lg">QuickEMS Inc.</p>
                  <p className="text-sm text-slate-600">123 Business Park</p>
                  <p className="text-sm text-slate-600">New York, NY 10001</p>
                  <p className="text-sm text-slate-600">contact@quickems.com</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Employee Details</p>
                <div className="space-y-2">
                  <p className="font-bold text-slate-900">
                    {payslip.employee?.firstName} {payslip.employee?.lastName}
                  </p>
                  <p className="text-sm text-slate-600">{payslip.employee?.position}</p>
                  <p className="text-sm text-slate-600">{payslip.employee?.department}</p>
                  <p className="text-sm text-slate-600">{payslip.employee?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Period Info */}
          <div className="mb-8 pb-6 border-b border-slate-200">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-4">Payslip Period</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-xs text-indigo-600 font-medium uppercase tracking-wider mb-1">Month</p>
                <p className="text-lg font-bold text-indigo-900">{months[payslip.month - 1]}</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-xs text-indigo-600 font-medium uppercase tracking-wider mb-1">Year</p>
                <p className="text-lg font-bold text-indigo-900">{payslip.year}</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-xs text-indigo-600 font-medium uppercase tracking-wider mb-1">ID</p>
                <p className="text-lg font-bold text-indigo-900">{payslip.id}</p>
              </div>
            </div>
          </div>

          {/* Earnings */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-emerald-200">Earnings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700 font-medium">Basic Salary</span>
                <span className="text-slate-900 font-bold text-lg">₹{payslip.basicSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700 font-medium">Allowances</span>
                <span className="text-emerald-600 font-bold text-lg">₹{payslip.allowances.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-emerald-900 font-semibold">Total Earnings</span>
                <span className="text-emerald-900 font-bold text-xl">₹{(payslip.basicSalary + payslip.allowances).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-rose-200">Deductions</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700 font-medium">Tax Deduction</span>
                <span className="text-rose-600 font-bold text-lg">₹{(payslip.deductions * 0.6).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700 font-medium">Professional Tax</span>
                <span className="text-rose-600 font-bold text-lg">₹{(payslip.deductions * 0.25).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700 font-medium">Other Deductions</span>
                <span className="text-rose-600 font-bold text-lg">₹{(payslip.deductions * 0.15).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg border border-rose-200">
                <span className="text-rose-900 font-semibold">Total Deductions</span>
                <span className="text-rose-900 font-bold text-xl">-₹{payslip.deductions.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border-2 border-indigo-300">
            <p className="text-sm text-indigo-600 font-medium uppercase tracking-wider mb-2">Net Salary (Take Home)</p>
            <p className="text-4xl font-bold text-indigo-900">₹{payslip.netSalary.toLocaleString()}</p>
          </div>

          {/* Summary */}
          <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-100 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600 font-medium mb-1">Days in Month</p>
              <p className="text-2xl font-bold text-slate-900">30</p>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600 font-medium mb-1">Working Days</p>
              <p className="text-2xl font-bold text-slate-900">22</p>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600 font-medium mb-1">Leave Taken</p>
              <p className="text-2xl font-bold text-slate-900">2</p>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600 font-medium mb-1">Absents</p>
              <p className="text-2xl font-bold text-slate-900">0</p>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-2">Payment Notes</p>
            <p className="text-sm text-blue-900">
              This is a digitally generated payslip. Please retain this document for your records. For queries, contact HR department.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-6 border-t border-slate-200">
            <button
              onClick={handlePrint}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
            >
              <Printer size={20} />
              Print
            </button>
            <button
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium"
            >
              <Download size={20} />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayslipModal
