// client/src/components/ErrorPage.jsx
import React from 'react'
import {
  useRouteError,
  isRouteErrorResponse,
  Link
} from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  let title = 'Oops!'
  let message = 'Something went wrong.'

  if (isRouteErrorResponse(error)) {
    // React Router 6.4+ error response
    title = `${error.status} ${error.statusText}`
    message = error.data?.message || 'Page not found.'
  } else if (error instanceof Error) {
    // JS exceptions
    message = error.message
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="mb-6 text-center">{message}</p>
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  )
}
