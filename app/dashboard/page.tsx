'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MessageForm from '@/app/components/MessageForm'
import QRCodeDisplay from '@/app/components/QRCodeDisplay'
import LoadingSpinner from '@/app/components/LoadingSpinner'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalMessages: 0,
    todayMessages: 0,
    totalContacts: 0,
    successRate: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.status === 401) {
          router.push('/auth/login')
          return
        }
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Error:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">📱 WA Auto Sender</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm md:text-base truncate">{user?.email}</span>
            <Link 
              href="/api/auth/logout"
              className="text-red-500 hover:text-red-700 font-semibold text-sm md:text-base"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* QR Code Section */}
          <div className="md:col-span-1">
            <QRCodeDisplay />
          </div>

          {/* Stats */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard 
              title="Total Pesan" 
              value={stats.totalMessages.toLocaleString()} 
              icon="📬"
              color="blue"
            />
            <StatCard 
              title="Terkirim Hari Ini" 
              value={stats.todayMessages.toLocaleString()} 
              icon="✅"
              color="green"
            />
            <StatCard 
              title="Total Kontak" 
              value={stats.totalContacts.toLocaleString()} 
              icon="👥"
              color="purple"
            />
            <StatCard 
              title="Tingkat Sukses" 
              value={`${stats.successRate}%`}
              icon="📊"
              color="orange"
            />
          </div>
        </div>

        {/* Message Form */}
        <MessageForm />
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: string
  color: 'blue' | 'green' | 'purple' | 'orange'
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 text-sm font-semibold">{title}</h3>
          <p className={`text-3xl font-bold mt-2 ${colorClasses[color]}`}>{value}</p>
        </div>
        <div className="text-4xl opacity-50">{icon}</div>
      </div>
    </div>
  )
}
