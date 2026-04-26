'use client'

import { useEffect, useState } from 'react'

export default function QRCodeDisplay() {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const response = await fetch('/api/wa/status', {
        method: 'GET',
      })
      const data = await response.json()
      if (data.connected) {
        setIsConnected(true)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleGenerateQR = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/wa/qrcode', {
        method: 'GET',
      })
      const data = await response.json()
      if (data.success && data.qrCode) {
        setQrCode(data.qrCode)
        setIsConnected(true)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-dark">Koneksi WhatsApp</h2>
      
      {!isConnected ? (
        <div className="text-center flex-1 flex flex-col items-center justify-center">
          <div className="text-6xl mb-4 opacity-50">📱</div>
          <button
            onClick={handleGenerateQR}
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed font-semibold w-full"
          >
            {loading ? 'Loading...' : 'Generate QR Code'}
          </button>
          <p className="text-gray-500 text-sm">Klik tombol untuk menghubungkan WhatsApp</p>
        </div>
      ) : (
        <div className="text-center flex-1 flex flex-col items-center justify-center">
          {qrCode && (
            <div className="mb-4 p-4 bg-white border-2 border-primary rounded-lg">
              <img src={qrCode} alt="QR Code" className="w-48 h-48" />
            </div>
          )}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></span>
            <p className="text-green-600 font-semibold">Terhubung</p>
          </div>
          <p className="text-gray-500 text-sm">Silakan scan QR Code dengan WhatsApp</p>
          <button
            onClick={() => { setIsConnected(false); setQrCode(null) }}
            className="mt-4 text-red-500 hover:text-red-700 text-sm font-semibold"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}
