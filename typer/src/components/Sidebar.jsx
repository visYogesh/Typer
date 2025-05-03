import React from 'react'
import { NavLink } from 'react-router-dom'

const linkClasses = ({ isActive }) =>
  `block px-4 py-2 rounded-lg transition ${
    isActive
      ? 'bg-blue-600 text-white'
      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
  }`

export default function Sidebar() {
  return (
    <nav className="w-64 bg-white shadow-lg flex-shrink-0">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-blue-600">TypeMaster</h1>
      </div>
      <ul className="space-y-2 px-2">
        <li>
          <NavLink to="/test" className={linkClasses}>
            Default Test
          </NavLink>
        </li>
        <li>
          <NavLink to="/import" className={linkClasses}>
            Import Essay
          </NavLink>
        </li>
        <li>
          <NavLink to="/coding" className={linkClasses}>
            Coding Practice
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
