import ProgressProvider from '@/components/ProgressProvider'
import './globals.css'


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
    <html lang="en" data-theme="light">
      <body>
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </body>
    </html>
  )
}
