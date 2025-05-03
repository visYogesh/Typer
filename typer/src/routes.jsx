import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './App'
import ImportPage from './components/ImportPage'
import Typewriter from './components/Typewriter'
import CodingHome from './components/CodingHome'
import ImportCodePage from './components/ImportCodePage'
import CodePractice from './components/CodePractice'

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Typewriter /> },       // "/"
      { path: 'test', element: <Typewriter /> },      // "/test"
      { path: 'import', element: <ImportPage /> },    // "/import"

      // Coding routes
      { path: 'coding', element: <CodingHome /> },             // "/coding"
      { path: 'coding/import', element: <ImportCodePage /> },  // "/coding/import"
      { path: 'coding/practice', element: <CodePractice /> }   // "/coding/practice"
    ]
  }
])
