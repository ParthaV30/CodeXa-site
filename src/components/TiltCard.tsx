"use client"

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
    children: React.ReactNode
    className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const xSpring = useSpring(x, { stiffness: 120, damping: 20 })
    const ySpring = useSpring(y, { stiffness: 120, damping: 20 })

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ['10deg', '-10deg'])
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-10deg', '10deg'])
    const glowX = useTransform(xSpring, [-0.5, 0.5], ['0%', '100%'])
    const glowY = useTransform(ySpring, [-0.5, 0.5], ['0%', '100%'])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current!.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
            className={`relative ${className}`}
        >
            {/* Shimmer highlight that follows tilt */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
                style={{
                    background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(108,99,255,0.15) 0%, transparent 60%)`,
                }}
            />
            {children}
        </motion.div>
    )
}
