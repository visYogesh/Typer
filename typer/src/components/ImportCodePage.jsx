import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ImportCodePage() {
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code.trim()) return
    // you could POST to your server if you want to save it
    navigate('/coding/practice', { state: { customCode: code } })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Import Your Code</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={8}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 font-mono text-sm resize-none"
          placeholder="Paste your code here…"
        />
        <button
          type="submit"
          className="w-full py-3 font-medium rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition"
        >
          Start Coding Practice
        </button>
      </form>
    </div>
  )
}
