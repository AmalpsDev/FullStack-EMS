import { useState } from 'react'

import SettingsAdmin from '../components/SettingsAdmin'
import SettingsEmployee from '../components/SettingsEmployee'

function Settings() {
  const  role  = "ADMIN"; // Change to "ADMIN" to test admin view;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and system preferences</p>
      </div>

      {/* Role-Based Settings */}
      {role === 'ADMIN' ? (
        <SettingsAdmin />
      ) : (
        <SettingsEmployee />
      )}
    </div>
  )
}

export default Settings
