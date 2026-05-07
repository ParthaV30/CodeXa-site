import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'
import FloatingCTA from '@/components/FloatingCTA'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
    title: 'Rturox — Tech Studio · Coimbatore',
    description: 'Rturox is a Coimbatore-based tech studio. We design, build, and launch websites, apps, and digital experiences for businesses that want to grow.',
    icons: { icon: '/logo.png' },
    openGraph: {
        title: 'Rturox — Tech Studio · Coimbatore',
        description: 'We design, build, and launch websites, apps, and digital experiences for businesses that want to grow.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="font-body">
                {/* Ambient gradient blobs */}
                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
                    <div
                        className="blob-1 absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[160px]"
                        style={{ background: 'rgba(124,92,252,0.12)' }}
                    />
                    <div
                        className="blob-2 absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[160px]"
                        style={{ background: 'rgba(6,214,240,0.07)' }}
                    />
                    <div
                        className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full blur-[140px]"
                        style={{ background: 'rgba(99,102,241,0.06)' }}
                    />
                </div>

                <ScrollProgress />
                <CursorGlow />
                {children}
                <FloatingCTA />
            </body>
        </html>
    )
}
