import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WhatsApp Auto Sender',
  description: 'Kirim pesan WhatsApp secara otomatis dengan mudah',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#25D366" />
      </head>
      <body className="bg-light text-dark">
        {children}
      </body>
    </html>
  )
}
