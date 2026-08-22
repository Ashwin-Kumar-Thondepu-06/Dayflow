import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dayflow',
  description: 'Human Resource Management System',
}

import { AuthProvider } from '@/components/providers/AuthContext';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
