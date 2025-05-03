import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SNIPPETS = [
  { id: 1, name: 'JavaScript: Hello World', code: `console.log('Hello, world!');` },
  { id: 2, name: 'Python: Hello World', code: `print("Hello, world!")` },
  { id: 3, name: 'Java: Hello World', code: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n  }\n}` }
]

export default function CodingHome() {
  const navigate = useNavigate()

  const startPractice = (code) => {
    navigate('/coding/practice', { state: { defaultCode: code } })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Choose a snippet to practice</h2>
      <ul className="space-y-3">
        {SNIPPETS.map(({ id, name, code }) => (
          <li key={id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
            <span>{name}</span>
            <button
              onClick={() => startPractice(code)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Practice
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          to="/coding/import"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Import Your Own Code
        </Link>
      </div>
    </div>
  )
}
