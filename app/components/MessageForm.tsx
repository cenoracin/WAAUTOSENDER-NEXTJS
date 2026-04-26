'use client'

import { useState } from 'react'

export default function MessageForm() {
  const [formData, setFormData] = useState({
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError('')

    if (!formData.phone.trim() || !formData.message.trim()) {
      setError('Nomor dan pesan harus diisi')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ phone: '', message: '' })
        setTimeout(() => setSuccess(false), 5000)
      } else {
        const data = await response.json()
        setError(data.error || 'Gagal mengirim pesan')
      }
    } catch (err) {
      setError('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-dark">Kirim Pesan</h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <span>✓</span>
          <span>Pesan berhasil dikirim!</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <span>✕</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Nomor WhatsApp
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-200 text-gray-800 rounded-l-lg font-medium">
              +62
            </span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 border border-gray-300 border-l-0 rounded-r-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition"
              placeholder="812345678"
              required
            />
          </div>
          <p className="text-gray-500 text-xs mt-1">Contoh: 812345678 (tanpa 0)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Pesan
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                handleChange(e)
              }
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 resize-none transition"
            rows={5}
            placeholder="Tulis pesan Anda di sini..."
            required
          />
          <div className="flex justify-between mt-2">
            <p className="text-gray-500 text-xs">Format: Plain text atau HTML</p>
            <p className={`text-xs font-medium ${formData.message.length > 900 ? 'text-red-600' : 'text-gray-500'}`}>
              {formData.message.length} / 1000
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.phone || !formData.message}
          className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Mengirim...' : '📤 Kirim Pesan'}
        </button>
      </form>
    </div>
  )
}
