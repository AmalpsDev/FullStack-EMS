
import { useParams } from 'react-router-dom'
import { dummyPayslipData } from '../assets/assets'
import { Download, Printer } from 'lucide-react'

function PrintPayslip() {
  const { id } = useParams();
  const payslip = dummyPayslipData.find(p => p._id === id || p.id === id);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (!payslip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 mb-2">Payslip Not Found</p>
          <p className="text-slate-600">The payslip you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      {/* Print Controls */}
      <div className="mb-6 flex gap-3 justify-center print:hidden">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
        >
          <Printer size={20} />
          Print
        </button>
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium"
        >
          <Download size={20} />
          Download PDF
        </button>
      </div>

      {/* Payslip Document */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12">
        {/* Header with Company Logo */}
        <div className="flex items-start justify-between mb-8 pb-8 border-b-2 border-indigo-600">
          <div>
            <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-3">
              EMS
            </div>
            <h1 className="text-2xl font-bold text-slate-900">QuickEMS Inc.</h1>
            <p className="text-slate-600 text-sm mt-1">Employee Management System</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600 font-medium">PAYSLIP</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">
              {months[payslip.month - 1]} {payslip.year}
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="mb-8 pb-8 border-b border-slate-200">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Company</p>
              <div className="space-y-1 text-sm text-slate-700">
                <p className="font-medium">QuickEMS Inc.</p>
                <p>123 Business Park</p>
                <p>New York, NY 10001</p>
                <p>contact@quickems.com | +1 (555) 123-4567</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Employee Information</p>
              <div className="space-y-1 text-sm text-slate-700">
                <p className="font-medium">{payslip.employee?.firstName} {payslip.employee?.lastName}</p>
                <p>Position: {payslip.employee?.position}</p>
                <p>Department: {payslip.employee?.department}</p>
                <p>Email: {payslip.employee?.email}</p>
                <p>Payslip ID: {payslip.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Structure Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-50 border-b-2 border-indigo-600">
                <th className="text-left px-4 py-3 text-sm font-semibold text-indigo-900">Earnings</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-indigo-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">Basic Salary</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">
                  ₹{payslip.basicSalary.toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">House Rent Allowance</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">
                  ₹{(payslip.allowances * 0.5).toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">Dearness Allowance</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">
                  ₹{(payslip.allowances * 0.3).toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">Other Allowances</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">
                  ₹{(payslip.allowances * 0.2).toLocaleString()}
                </td>
              </tr>
              <tr className="bg-emerald-50 border-b-2 border-emerald-600">
                <td className="px-4 py-3 text-sm font-semibold text-emerald-900">Total Earnings</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-emerald-900">
                  ₹{(payslip.basicSalary + payslip.allowances).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Deductions */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-rose-50 border-b-2 border-rose-600">
                <th className="text-left px-4 py-3 text-sm font-semibold text-rose-900">Deductions</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-rose-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">Income Tax</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">
                  ₹{(payslip.deductions * 0.6).toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">Professional Tax</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">
                  ₹{(payslip.deductions * 0.25).toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">Provident Fund</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">
                  ₹{(payslip.deductions * 0.15).toLocaleString()}
                </td>
              </tr>
              <tr className="bg-rose-50 border-b-2 border-rose-600">
                <td className="px-4 py-3 text-sm font-semibold text-rose-900">Total Deductions</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-rose-900">
                  -₹{payslip.deductions.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Net Salary */}
        <div className="mb-8 p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2">Net Salary (Take Home)</p>
          <p className="text-4xl font-bold">₹{payslip.netSalary.toLocaleString()}</p>
        </div>

        {/* Attendance Summary */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="border border-slate-300 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Days in Month</p>
            <p className="text-2xl font-bold text-slate-900">30</p>
          </div>
          <div className="border border-slate-300 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Working Days</p>
            <p className="text-2xl font-bold text-slate-900">22</p>
          </div>
          <div className="border border-slate-300 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Days Present</p>
            <p className="text-2xl font-bold text-emerald-600">20</p>
          </div>
          <div className="border border-slate-300 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Days Absent</p>
            <p className="text-2xl font-bold text-rose-600">0</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-8 border-t-2 border-slate-300 text-center space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            This is a digitally generated payslip and does not require a physical signature. 
            This document is confidential and intended for the employee only.
          </p>
          <div className="flex justify-between items-end pt-4">
            <div className="text-center">
              <div className="w-32 h-12 border-t-2 border-slate-400 mx-auto mb-1"></div>
              <p className="text-xs text-slate-600 font-semibold">HR Manager</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">
                Generated on: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-12 border-t-2 border-slate-400 mx-auto mb-1"></div>
              <p className="text-xs text-slate-600 font-semibold">Finance Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .max-w-4xl {
            max-width: 100%;
          }
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default PrintPayslip