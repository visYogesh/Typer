import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

export default function Layout() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  )
}
