"use client"

import { motion } from 'framer-motion'

export default function Hero() {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">

            {/* Hero glow orb */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
                    style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.8) 0%, rgba(99,102,241,0.4) 50%, transparent 80%)' }}
                />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
                {/* Badge */}
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className="pill-badge">
                        ✦ Coimbatore&apos;s Tech Studio
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    We Build{' '}
                    <span className="gradient-text">Digital</span>
                    <br />
                    Products That Work.
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    className="text-base sm:text-lg md:text-xl text-[#8A8AAA] max-w-2xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    Rturox is a Coimbatore-based tech studio. We design, build, and launch
                    websites, apps, and digital experiences for businesses that want to grow.
                </motion.p>

                {/* CTA row */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <button onClick={scrollToContact} className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base">
                        Start a Project →
                    </button>
                    <a href="#work" className="btn-secondary w-full sm:w-auto px-8 py-3.5 text-base">
                        See Our Work
                    </a>
                </motion.div>

                {/* Scroll hint */}
                <motion.p
                    className="text-[#8A8AAA] text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    or scroll to explore ↓
                </motion.p>
            </div>
        </section>
    )
}
