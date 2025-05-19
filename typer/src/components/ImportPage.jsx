import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ImportPage() {
  const [text, setText] = useState('')
  const [selectedTime, setSelectedTime] = useState(0) // State for selected timer
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    if (selectedTime === 0) {
      alert('Please select a time for the typing test!')
      return
    }

    try {
      // Send the text and selected time to the backend
      const res = await fetch(`https://typerbacker11.onrender.com/api/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      if (!res.ok) {
        throw new Error('Failed to submit text')
      }

      const data = await res.json()

      // Navigate to the typing test page with the text and timer
      navigate('/test', { state: { customText: data.text, selectedTime } })
    } catch (error) {
      console.error('Error submitting text:', error)
    }
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

        {/* Timer selection */}
        <div className="mb-4">
          <label htmlFor="timer" className="block text-lg font-medium">Select Timer</label>
          <select
            id="timer"
            value={selectedTime}
            onChange={(e) => setSelectedTime(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
          >
            <option value={0}>Select Time</option>
            <option value={60}>1 Minute</option>
            <option value={120}>2 Minutes</option>
            <option value={300}>5 Minutes</option>
            <option value={600}>10 Minutes</option>
            <option value={1800}>30 Minutes</option>
          </select>
        </div>

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
