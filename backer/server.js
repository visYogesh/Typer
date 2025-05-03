const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/text', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'No text provided' })
  res.json({ text })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))