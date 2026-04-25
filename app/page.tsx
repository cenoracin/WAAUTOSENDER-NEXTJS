import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4">
      <div className="text-center text-white max-w-2xl">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            📱
          </h1>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          WhatsApp Auto Sender
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Kirim pesan WhatsApp secara otomatis dengan mudah dan cepat
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap mb-16">
          <Link 
            href="/auth/login"
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-light transition transform hover:scale-105 shadow-lg"
          >
            Login
          </Link>
          <Link 
            href="/auth/register"
            className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition border-2 border-white shadow-lg"
          >
            Register
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur hover:bg-opacity-20 transition">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-2xl font-bold mb-2">Mudah Digunakan</h3>
            <p className="opacity-90">Interface intuitif yang user-friendly</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur hover:bg-opacity-20 transition">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-2xl font-bold mb-2">Cepat</h3>
            <p className="opacity-90">Kirim pesan dengan kecepatan tinggi</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur hover:bg-opacity-20 transition">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-2xl font-bold mb-2">Aman</h3>
            <p className="opacity-90">Data terenkripsi dan terlindungi</p>
          </div>
        </div>

        <div className="mt-12 text-opacity-75 text-white">
          <p className="text-sm">v1.0.0 - Production Ready</p>
        </div>
      </div>
    </main>
  )
}
