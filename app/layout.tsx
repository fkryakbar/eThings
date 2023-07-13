import './globals.css'
import { Inter } from 'next/font/google'


export const metadata = {
  title: 'eThings',
  description: 'Fast and Easy Storage Solutions for Your Digital World',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}