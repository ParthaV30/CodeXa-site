"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = [
    {
        tag: 'Web App · Restaurant',
        title: 'Restaurant Management System',
        desc: 'Full-stack order management, menu, and analytics dashboard. 40% efficiency gain reported.',
        tech: ['React', 'Node.js', 'PostgreSQL'],
        accent: '#7C5CFC',
    },
    {
        tag: 'Web App · Events',
        title: 'Event Management Platform',
        desc: 'End-to-end event booking, ticketing, and attendee management portal.',
        tech: ['Next.js', 'Supabase', 'Stripe'],
        accent: '#06D6F0',
    },
    {
        tag: 'Website · Education',
        title: 'Coaching Institute Website',
        desc: 'Modern responsive website with course listings, inquiry forms, and SEO optimization.',
        tech: ['Next.js', 'Tailwind', 'Vercel'],
        accent: '#34D399',
    },
    {
        tag: 'Mobile App · Retail',
        title: 'Crackers E-Commerce App',
        desc: 'Festival season mobile app with product catalog, cart, and WhatsApp order integration.',
        tech: ['React Native', 'Firebase', 'Razorpay'],
        accent: '#F97316',
    },
    {
        tag: 'Web App · Fitness',
        title: 'Gym Member Portal',
        desc: 'Membership management, attendance tracking, and trainer scheduling system.',
        tech: ['React', 'Express', 'MongoDB'],
        accent: '#A78BFA',
    },
    {
        tag: 'Mobile App · Logistics',
        title: 'Cargo Tracking App',
        desc: 'Real-time shipment tracking, driver assignment, and delivery confirmation app.',
        tech: ['Flutter', 'Node.js', 'Google Maps API'],
        accent: '#60A5FA',
    },
    {
        tag: 'Website · Construction',
        title: 'Construction Company Website',
        desc: 'Portfolio-driven website with project gallery, client testimonials, and lead capture.',
        tech: ['Next.js', 'Tailwind', 'Sanity CMS'],
        accent: '#FBBF24',
    },
    {
        tag: 'Mobile App · Healthcare',
        title: 'Clinic Appointment App',
        desc: 'Patient booking, doctor availability, and prescription management mobile app.',
        tech: ['React Native', 'Supabase', 'Twilio'],
        accent: '#F472B6',
    },
    {
        tag: 'Web App · Real Estate',
        title: 'Property Listing Platform',
        desc: 'Advanced property search, virtual tours, and agent CRM dashboard.',
        tech: ['Next.js', 'PostgreSQL', 'AWS S3'],
        accent: '#818CF8',
    },
    {
        tag: 'Website · Travel',
        title: 'Travel Agency Website',
        desc: 'Tour package listings, itinerary builder, and online booking with payment gateway.',
        tech: ['Next.js', 'Stripe', 'Vercel'],
        accent: '#22D3EE',
    },
]

export default function Portfolio() {
    const [showAll, setShowAll] = useState(false)
    const visible = showAll ? projects : projects.slice(0, 6)

    return (
        <section id="work" className="py-24 px-4 sm:px-6">
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
                        <span className="pill-badge">✦ Selected Work</span>
                    </motion.div>
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        20+ projects shipped.{' '}
                        <span className="gradient-text">Here&apos;s a few.</span>
                    </motion.h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {visible.map((project, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-6 flex flex-col gap-4 group"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            {/* Tag */}
                            <span
                                className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md self-start"
                                style={{ background: `${project.accent}15`, color: project.accent }}
                            >
                                {project.tag}
                            </span>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-2 leading-snug">{project.title}</h3>
                                <p className="text-[#8A8AAA] text-sm leading-relaxed">{project.desc}</p>
                            </div>

                            {/* Tech pills */}
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2.5 py-1 rounded-full border"
                                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#8A8AAA' }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <a
                                href="#contact"
                                className="text-sm font-semibold transition-all duration-200 flex items-center gap-1 group-hover:gap-2"
                                style={{ color: project.accent }}
                            >
                                Get in Touch <span>→</span>
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Show all button */}
                <div className="text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="btn-secondary px-8 py-3 text-sm"
                    >
                        {showAll ? 'Show Less ↑' : `See All ${projects.length} Projects →`}
                    </button>
                </div>
            </div>
        </section>
    )
}
