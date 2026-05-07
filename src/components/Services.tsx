"use client"

import { motion } from 'framer-motion'
import { Globe, Smartphone, Palette, TrendingUp, Cloud, Shield } from 'lucide-react'

const services = [
    {
        icon: Globe,
        title: 'Web Development',
        desc: 'Fast, responsive websites and web apps built with React, Next.js, and modern tech.',
        color: '#7C5CFC',
    },
    {
        icon: Smartphone,
        title: 'Mobile Apps',
        desc: 'iOS and Android apps that users love — built with React Native or Flutter.',
        color: '#06D6F0',
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        desc: 'Interfaces designed for clarity and conversion. Figma-first, pixel-perfect.',
        color: '#A78BFA',
    },
    {
        icon: TrendingUp,
        title: 'Digital Marketing',
        desc: 'SEO, social media, and performance campaigns that drive real results.',
        color: '#34D399',
    },
    {
        icon: Cloud,
        title: 'Cloud & DevOps',
        desc: 'AWS deployments, CI/CD pipelines, and infrastructure that scales.',
        color: '#60A5FA',
    },
    {
        icon: Shield,
        title: 'Maintenance & Security',
        desc: 'Ongoing support, updates, and security monitoring post-launch.',
        color: '#F472B6',
    },
]

export default function Services() {
    return (
        <section id="services" className="py-24 px-4 sm:px-6">
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
                        <span className="pill-badge">✦ Our Services</span>
                    </motion.div>
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Everything you need to{' '}
                        <span className="gradient-text">go digital.</span>
                    </motion.h2>
                    <motion.p
                        className="text-[#8A8AAA] max-w-2xl mx-auto text-base sm:text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        From a landing page to a full SaaS platform — we handle every layer of your digital presence.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-6 group cursor-default"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            {/* Icon */}
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                style={{ background: `${service.color}18` }}
                            >
                                <service.icon className="w-5 h-5" style={{ color: service.color }} />
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-2.5">{service.title}</h3>
                            <p className="text-[#8A8AAA] text-sm leading-relaxed mb-5">{service.desc}</p>
                            <span
                                className="text-sm font-semibold transition-colors duration-200 group-hover:opacity-80"
                                style={{ color: service.color }}
                            >
                                Learn more →
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
