import React from 'react'

function LoginLeftSide() {
  return (
    <div className="hidden md:flex md:w-1/2 lg:w-2/3 bg-indigo-950 relative overflow-hidden border-r border-slate-200">
      <div className="absolute -top-30 -left-30 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl">
      </div>
      <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-20 h-full w-full">
        <h1 className='text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight tracking-tight'>Employee <br />Management System</h1>
        <p className='text-slate-400 text-lg max-w-md leading-relaxed'>Please enter your credentials to access your account.</p>
      </div>
    </div>
  )
}

export default LoginLeftSide