"use client"

import { motion } from 'framer-motion'

const steps = [
    {
        number: '01',
        name: 'Discover',
        desc: 'We learn your goals, audience, and constraints to map a clear path forward.',
        color: '#7C5CFC',
    },
    {
        number: '02',
        name: 'Design',
        desc: 'We prototype and present the vision before a line of code is written.',
        color: '#06D6F0',
    },
    {
        number: '03',
        name: 'Build',
        desc: 'We develop, test, and iterate in tight 1-week sprints.',
        color: '#A78BFA',
    },
    {
        number: '04',
        name: 'Launch',
        desc: 'We deploy, monitor, and hand over with full documentation.',
        color: '#34D399',
    },
]

export default function HowWeWork() {
    return (
        <section className="py-24 px-4 sm:px-6" style={{ background: 'rgba(9,9,26,0.8)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        className="flex justify-center mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="pill-badge">✦ How We Work</span>
                    </motion.div>
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        From brief to launch —{' '}
                        <span className="gradient-text">our process.</span>
                    </motion.h2>
                </div>

                {/* Steps grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-7 flex flex-col gap-4 relative overflow-hidden group"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            {/* Step number */}
                            <div
                                className="text-5xl font-black leading-none select-none opacity-10 absolute top-4 right-5"
                                style={{ color: step.color }}
                            >
                                {step.number}
                            </div>

                            {/* Icon circle */}
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                                style={{ background: `${step.color}18`, color: step.color }}
                            >
                                {step.number}
                            </div>

                            <div>
                                <h3 className="text-white font-bold text-lg mb-2">{step.name}</h3>
                                <p className="text-[#8A8AAA] text-sm leading-relaxed">{step.desc}</p>
                            </div>

                            {/* Bottom accent line */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: `linear-gradient(to right, transparent, ${step.color}, transparent)` }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
