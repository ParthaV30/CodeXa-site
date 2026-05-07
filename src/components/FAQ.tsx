"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
    {
        q: 'How long does a typical project take?',
        a: 'A basic website takes 1–2 weeks. Complex web apps take 3–6 weeks depending on features. We\'ll give you an exact timeline after the discovery call.',
    },
    {
        q: 'Do you handle hosting and deployment?',
        a: 'Yes. We deploy on AWS, Vercel, or your preferred platform — fully configured, secured, and monitored.',
    },
    {
        q: 'Can you redesign my existing website?',
        a: 'Absolutely. We audit your current site, propose improvements, and migrate with zero downtime.',
    },
    {
        q: 'Do you work with clients outside Coimbatore?',
        a: 'Yes. We work with clients across India and internationally — 100% remote-friendly with async updates.',
    },
    {
        q: 'What happens after launch?',
        a: 'We offer 1-month free bug support post-launch, and flexible maintenance retainers after that.',
    },
]

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <section className="py-24 px-4 sm:px-6" style={{ background: 'rgba(9,9,26,0.8)' }}>
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <motion.div
                        className="flex justify-center mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="pill-badge">✦ FAQ</span>
                    </motion.div>
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Questions we{' '}
                        <span className="gradient-text">get asked.</span>
                    </motion.h2>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="glass-card overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: '-40px' }}
                        >
                            <button
                                className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 group"
                                onClick={() => setOpen(open === index ? null : index)}
                            >
                                <span className="text-white font-medium text-sm sm:text-base leading-snug group-hover:text-[#A78BFA] transition-colors">
                                    {faq.q}
                                </span>
                                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                                    style={{ background: open === index ? 'rgba(124,92,252,0.2)' : 'rgba(255,255,255,0.06)' }}>
                                    {open === index
                                        ? <Minus className="w-3.5 h-3.5 text-[#7C5CFC]" />
                                        : <Plus className="w-3.5 h-3.5 text-[#8A8AAA]" />
                                    }
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {open === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <p className="px-6 pb-5 text-[#8A8AAA] text-sm leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
