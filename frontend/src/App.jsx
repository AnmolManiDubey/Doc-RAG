import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState('')
  const inputRef = useRef()

  // Drag and drop handlers
  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setUploadMsg('')
    }
  }
  const handleDragOver = (e) => e.preventDefault()

  // File input handler
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setUploadMsg('')
  }

  // Upload handler
  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setUploadMsg('Uploading...')
    const formData = new FormData()
    formData.append('files', file)
    try {
      const res = await fetch('/upload/', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        setUploadMsg('Upload successful!')
      } else {
        setUploadMsg('Upload failed.')
      }
    } catch (err) {
      setUploadMsg('Upload error.')
    }
    setUploading(false)
  }

  // Question handler
  const handleAsk = async () => {
    if (!question) return
    setLoading(true)
    setAnswer('')
    try {
      const res = await fetch('/query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: question }),
      })
      const data = await res.json()
      setAnswer(data.answer || 'No answer found.')
    } catch (err) {
      setAnswer('Error fetching answer.')
    }
    setLoading(false)
  }

  return (
    <div className="page">
      <div className="container">
        <h1>RAG Demo</h1>
        <p className="subtitle">Upload a PDF and ask questions about its content</p>

        {/* Upload Section */}
        <div className="section">
          <label className="section-label">Upload Document</label>
          <div
            className={`dropzone${file ? ' has-file' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => inputRef.current.click()}
          >
            {file ? (
              <span className="file-name">{file.name}</span>
            ) : (
              <span>Drag & drop or click to select a PDF</span>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <div className="upload-actions">
            <button onClick={handleUpload} disabled={!file || uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <span className="msg">{uploadMsg}</span>
          </div>
        </div>

        {/* Question Section */}
        <div className="section">
          <label className="section-label">Ask a Question</label>
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Type your question..."
            rows={3}
          />
          <button onClick={handleAsk} disabled={!question || loading}>
            {loading ? 'Loading...' : 'Ask'}
          </button>
        </div>

        {/* Answer Section */}
        <div className="section">
          <label className="section-label">Answer</label>
          <div className="answer">
            {loading ? <span>Generating answer...</span> : answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
