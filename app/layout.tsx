import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NeuroLink - App Móvil de Bienestar Emocional',
  description: 'Aplicación móvil de soporte emocional para estudiantes. Registra tus emociones, obtén análisis IA, conecta con la comunidad y cuida tu bienestar mental.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark bg-[#0F172A]">
      <body className="font-sans antialiased bg-[#0F172A] flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {children}
        </div>
      </body>
    </html>
  )
}
