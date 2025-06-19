'use client'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })

  useEffect(() => {
    if (document.cookie.includes('auth=true')) {
      setAuth(true)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      setAuth(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (res.ok) {
      alert('Uploaded')
      e.target.reset()
    } else {
      alert('Upload failed')
    }
  }

  if (!auth) {
    return (
      <div className="p-8 max-w-sm">
        <h1 className="text-2xl mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 w-full"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-sm">
      <h1 className="text-2xl mb-4">Upload Image</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" name="image" accept="image/*" className="border p-2 w-full" required />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Upload
        </button>
      </form>
    </div>
  )
}
