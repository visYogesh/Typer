import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ImportPage() {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const res = await fetch('/api/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    const data = await res.json()
    navigate('/test', { state: { customText: data.text } })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Import Your Essay</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="Paste any text here…"
        />
        <button
          type="submit"
          className="w-full py-3 font-medium rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          Start Typing
        </button>
      </form>
    </div>
  )
}
