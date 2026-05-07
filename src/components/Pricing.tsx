"use client"

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
    {
        name: 'Starter',
        price: '₹15,000',
        period: 'per project',
        desc: 'Best for: Landing pages, portfolios, small business sites',
        features: [
            'Up to 5 pages',
            'Mobile responsive',
            'Contact form',
            'Basic SEO',
            '1 revision round',
            'Delivered in 1–2 weeks',
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Growth',
        price: '₹45,000',
        period: 'per project',
        desc: 'Best for: Web apps, e-commerce, booking systems',
        features: [
            'Everything in Starter',
            'Custom web app',
            'Database integration',
            'Admin panel',
            '3 revision rounds',
            '1 month support',
            'Delivered in 3–5 weeks',
        ],
        cta: 'Start a Project',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'tailored quote',
        desc: 'Best for: SaaS, mobile apps, full digital transformation',
        features: [
            'Everything in Growth',
            'Mobile app',
            'Cloud infrastructure',
            'Dedicated project manager',
            'Ongoing retainer available',
            'Custom timeline',
        ],
        cta: "Let's Talk",
        popular: false,
    },
]

export default function Pricing() {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="pricing" className="py-24 px-4 sm:px-6">
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
                        <span className="pill-badge">✦ Pricing</span>
                    </motion.div>
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Simple,{' '}
                        <span className="gradient-text">transparent pricing.</span>
                    </motion.h2>
                    <motion.p
                        className="text-[#8A8AAA] max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        No surprises. Pick a starting point and we&apos;ll tailor it to your needs.
                    </motion.p>
                </div>

                {/* Plans grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                                plan.popular
                                    ? 'border border-[#7C5CFC]/60 shadow-2xl shadow-[#7C5CFC]/15'
                                    : 'glass-card'
                            }`}
                            style={plan.popular ? {
                                background: 'linear-gradient(160deg, rgba(124,92,252,0.12) 0%, rgba(99,102,241,0.06) 100%)',
                                backdropFilter: 'blur(20px)',
                            } : {}}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white"
                                        style={{ background: 'linear-gradient(135deg, #7C5CFC, #6366F1)' }}>
                                        Most Popular ✦
                                    </span>
                                </div>
                            )}

                            {/* Plan name */}
                            <p className="text-[#8A8AAA] text-sm font-semibold tracking-wider uppercase mb-4">{plan.name}</p>

                            {/* Price */}
                            <div className="mb-2">
                                <span
                                    className="text-4xl sm:text-5xl font-black"
                                    style={plan.popular ? {
                                        background: 'linear-gradient(135deg, #A78BFA, #7C5CFC)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    } : { color: 'white' }}
                                >
                                    {plan.price}
                                </span>
                            </div>
                            <p className="text-[#8A8AAA] text-xs mb-2">{plan.period}</p>
                            <p className="text-[#8A8AAA] text-sm mb-7 pb-7 border-b border-white/[0.07]">{plan.desc}</p>

                            {/* Features */}
                            <ul className="flex-1 space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                                        <Check
                                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                                            style={{ color: plan.popular ? '#7C5CFC' : '#34D399' }}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                onClick={scrollToContact}
                                className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    plan.popular
                                        ? 'btn-primary'
                                        : 'btn-secondary'
                                }`}
                            >
                                {plan.cta} →
                            </button>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-[#8A8AAA] text-xs mt-8">
                    All prices are starting points. Final quote after free consultation. GST applicable.
                </p>
            </div>
        </section>
    )
}
