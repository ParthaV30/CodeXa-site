"use client"

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const stats = [
    { number: 30, suffix: '+', label: 'Projects Delivered', color: '#7C5CFC' },
    { number: 25, suffix: '+', label: 'Happy Clients', color: '#06D6F0' },
    { number: 98, suffix: '%', label: 'On-Time Delivery', color: '#34D399' },
    { number: 2025, suffix: '', label: 'Est. Coimbatore, India', color: '#A78BFA' },
]

function Counter({ target, suffix, color }: { target: number; suffix: string; color: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    useEffect(() => {
        if (!inView) return
        let start = 0
        const step = Math.ceil(target / 60)
        const interval = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(interval) }
            else setCount(start)
        }, 30)
        return () => clearInterval(interval)
    }, [inView, target])

    return (
        <span
            ref={ref}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-none"
            style={{
                background: `linear-gradient(135deg, ${color}, white)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}
        >
            {count}{suffix}
        </span>
    )
}

export default function Results() {
    return (
        <section className="py-24 px-4 sm:px-6" style={{ background: 'rgba(9,9,26,0.8)' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex justify-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="pill-badge">✦ Results</span>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-6 sm:p-8 text-center flex flex-col items-center gap-3"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <Counter target={stat.number} suffix={stat.suffix} color={stat.color} />
                            <p className="text-[#8A8AAA] text-sm font-medium leading-snug">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
