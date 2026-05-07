"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const testimonials = [
    {
        quote: 'Rturox transformed our restaurant operations. The system they built increased our efficiency by 40% — delivered on time, no drama.',
        author: 'Vedha Krishnan', role: 'Owner · VedhasKitchen', initials: 'VK', color: '#7C5CFC',
    },
    {
        quote: 'Professional team, clean delivery. The event platform exceeded every expectation we had going in.',
        author: 'Rajesh Kumar', role: 'Manager · PowerHouse Events', initials: 'RK', color: '#06D6F0',
    },
    {
        quote: 'They built us a website that actually gets enquiries. Modern, fast, and exactly what we needed.',
        author: 'Tamil Selvan', role: 'Director · BrightPath Coaching', initials: 'TS', color: '#34D399',
    },
    {
        quote: "Our crackers app during Diwali season was a massive hit. Orders poured in through the app — couldn't have asked for better.",
        author: 'Murugan P.', role: 'Owner · PH Crackers', initials: 'MP', color: '#F97316',
    },
    {
        quote: 'The gym portal they built saves us hours every week. Member management has never been this smooth.',
        author: 'Karthik S.', role: 'Founder · FitZone Gym', initials: 'KS', color: '#A78BFA',
    },
    {
        quote: 'Real-time tracking for our cargo fleet was a game changer. Rturox delivered exactly what we described.',
        author: 'Anand R.', role: 'CEO · SwiftCargo Logistics', initials: 'AR', color: '#60A5FA',
    },
    {
        quote: 'Our construction website now ranks on Google and brings in leads every week. Worth every rupee.',
        author: 'Suresh B.', role: 'MD · Skyline Constructions', initials: 'SB', color: '#FBBF24',
    },
    {
        quote: 'The clinic app made appointment booking effortless for our patients. Complaints dropped to zero.',
        author: 'Dr. Priya N.', role: 'Doctor · MediCare Clinic', initials: 'PN', color: '#F472B6',
    },
    {
        quote: 'Our property listings platform is slick and fast. The team understood real estate workflows perfectly.',
        author: 'Vikram J.', role: 'Director · UrbanEdge Realty', initials: 'VJ', color: '#818CF8',
    },
    {
        quote: "Bookings went up 60% after the new travel website launched. Rturox knows what they're doing.",
        author: 'Deepa M.', role: 'Owner · BlueWave Travels', initials: 'DM', color: '#22D3EE',
    },
]

export default function Testimonials() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length)
        }, 4500)
        return () => clearInterval(interval)
    }, [])

    const t = testimonials[current]

    return (
        <section className="py-24 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
                {/* Header */}
                <motion.div
                    className="flex justify-center mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="pill-badge">✦ Testimonials</span>
                </motion.div>
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-14 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    What our{' '}
                    <span className="gradient-text">clients say.</span>
                </motion.h2>

                {/* Testimonial card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        className="glass-card p-8 sm:p-12 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-lg">★</span>
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-base sm:text-lg md:text-xl text-white leading-relaxed mb-8 italic">
                            &ldquo;{t.quote}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center justify-center gap-4">
                            <div
                                className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                            >
                                {t.initials}
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-sm">{t.author}</p>
                                <p className="text-[#8A8AAA] text-xs">{t.role}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="flex justify-center gap-2 flex-wrap">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className="transition-all duration-300 rounded-full"
                            style={{
                                width: i === current ? '24px' : '8px',
                                height: '8px',
                                background: i === current ? '#7C5CFC' : 'rgba(255,255,255,0.15)',
                            }}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
