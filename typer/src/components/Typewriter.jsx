import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.`
const DURATIONS = [1, 2, 5, 10, 30] // minutes

export default function Typewriter() {
  const { state } = useLocation()
  const text = state?.customText || DEFAULT_TEXT

  // --- Configuration ---
  const [durationMin, setDurationMin] = useState(1)
  const TEST_DURATION = durationMin * 60

  // --- Test State ---
  const [input, setInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [finished, setFinished] = useState(false)

  // --- Metrics ---
  const [backspaces, setBackspaces] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [speedHistory, setSpeedHistory] = useState([])
  const [highestSpeed, setHighestSpeed] = useState(0)

  const textareaRef = useRef()

  // Timer effect
  useEffect(() => {
    if (!isRunning) return

    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        const elapsed = TEST_DURATION - timeLeft + 1
        const wordsTyped = input.trim().split(/\s+/).filter(Boolean).length
        const instWpm = Math.round((wordsTyped / elapsed) * 60)
        setSpeedHistory((h) => [...h, instWpm])
        setHighestSpeed((h) => Math.max(h, instWpm))

        setTimeLeft((t) => t - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    } else {
      endTest()
    }
  }, [isRunning, timeLeft])

  const startTest = () => {
    setInput('')
    setTimeLeft(TEST_DURATION)
    setIsRunning(true)
    setFinished(false)
    setBackspaces(0)
    setWrongCount(0)
    setSpeedHistory([])
    setHighestSpeed(0)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  const endTest = () => {
    setIsRunning(false)
    setFinished(true)
    textareaRef.current?.blur()
  }

  const handleChange = (e) => {
    if (!isRunning) startTest()
    if (finished) return

    const newVal = e.target.value
    const idx = newVal.length - 1
    if (idx >= 0 && newVal[idx] !== text[idx]) {
      setWrongCount((w) => w + 1)
    }
    setInput(newVal)

    if (newVal.length >= text.length) {
      endTest()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setBackspaces((b) => b + 1)
    }
  }

  // Final metrics
  const correctChars = [...input].filter((ch, i) => ch === text[i]).length
  const totalErrors = wrongCount + backspaces
  const accuracy =
    correctChars + totalErrors > 0
      ? (correctChars / (correctChars + totalErrors)) * 100
      : 100
  const totalWords = input.trim().split(/\s+/).filter(Boolean).length
  const wpm = Math.round((totalWords / TEST_DURATION) * (TEST_DURATION - timeLeft))

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Configuration */}
      {!isRunning && !finished && (
        <div className="flex items-center space-x-4">
          <label className="font-medium">Duration:</label>
          <select
            value={durationMin}
            onChange={(e) => setDurationMin(+e.target.value)}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          >
            {DURATIONS.map((m) => (
              <option key={m} value={m}>
                {m} min
              </option>
            ))}
          </select>
          <button
            onClick={startTest}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Start Test
          </button>
        </div>
      )}

      {/* Text Display */}
      {(isRunning || finished) && (
        <div className="p-6 bg-white rounded shadow h-48 overflow-auto font-mono text-lg leading-relaxed">
          {text.split('').map((char, i) => {
            let cls = 'opacity-50'
            if (i < input.length) {
              cls = char === input[i] ? 'text-green-500' : 'text-red-500'
            }
            return (
              <span key={i} className={cls}>
                {char}
              </span>
            )
          })}
        </div>
      )}

      {/* Typing Area */}
      {(isRunning || finished) && (
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={finished}
          className="w-full h-36 p-4 border rounded focus:ring-2 focus:ring-blue-400 font-mono text-lg resize-none"
          placeholder="Start typing here…"
        />
      )}

      {/* Footer Stats */}
      {(isRunning || finished) && (
        <div className="flex flex-wrap justify-between items-center text-sm space-y-2">
          <div>
            <strong>Time Left:</strong>{' '}
            <span className="text-blue-600">{timeLeft}s</span>
          </div>
          <div className="space-x-4">
            <span>
              <strong>Accuracy:</strong>{' '}
              <span className="text-green-600">{accuracy.toFixed(2)}%</span>
            </span>
            <span>
              <strong>WPM:</strong>{' '}
              <span className="text-blue-600">{wpm}</span>
            </span>
            <span>
              <strong>Backspaces:</strong> {backspaces}
            </span>
            <span>
              <strong>Wrong Keystrokes:</strong> {wrongCount}
            </span>
            <span>
              <strong>Peak WPM:</strong> {highestSpeed}
            </span>
          </div>
          {!finished && (
            <button
              onClick={endTest}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              End Test
            </button>
          )}
        </div>
      )}
    </div>
  )
}
