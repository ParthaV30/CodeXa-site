"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Mail, MessageCircle } from 'lucide-react'

const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-[#8A8AAA] text-sm focus:border-[#7C5CFC]/60 focus:outline-none focus:bg-white/[0.06] transition-all duration-200"

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (response.ok) {
                setSubmitted(true)
                const whatsappMessage = `Hi, I'm ${form.name}. Service: ${form.service}. Message: ${form.message}. Email: ${form.email}. Phone: ${form.phone}`
                window.open(`https://wa.me/6381169124?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
            } else {
                alert('Failed to send message')
            }
        } catch {
            alert('Error sending message')
        }
    }

    return (
        <section id="contact" className="py-24 px-4 sm:px-6">
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
                        <span className="pill-badge">✦ Contact</span>
                    </motion.div>
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Ready to build{' '}
                        <span className="gradient-text">something great?</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Left info column */}
                    <motion.div
                        className="lg:col-span-2 flex flex-col gap-6"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                    >
                        <p className="text-[#8A8AAA] text-base leading-relaxed">
                            Drop us a message and we&apos;ll get back within 24 hours. Or reach out directly on WhatsApp for faster replies.
                        </p>

                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex items-center gap-3 text-white/80 text-sm">
                                <div className="w-9 h-9 rounded-xl bg-[#7C5CFC]/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-4 h-4 text-[#7C5CFC]" />
                                </div>
                                Vadavalli, Coimbatore 641046
                            </div>
                            <div className="flex items-center gap-3 text-white/80 text-sm">
                                <div className="w-9 h-9 rounded-xl bg-[#06D6F0]/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-[#06D6F0]" />
                                </div>
                                <a href="mailto:rturoxtechnology@gmail.com" className="hover:text-[#06D6F0] transition-colors">
                                    rturoxtechnology@gmail.com
                                </a>
                            </div>
                            <a
                                href="https://wa.me/6381169124"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm text-white/80 hover:text-[#34D399] transition-colors"
                            >
                                <div className="w-9 h-9 rounded-xl bg-[#34D399]/10 flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-4 h-4 text-[#34D399]" />
                                </div>
                                WhatsApp — quick reply
                            </a>
                        </div>

                        {/* Mini stat */}
                        <div className="mt-4 glass-card p-5 flex items-center gap-4">
                            <div className="text-3xl font-black gradient-text">24h</div>
                            <p className="text-[#8A8AAA] text-sm leading-snug">Average response time for new enquiries</p>
                        </div>
                    </motion.div>

                    {/* Right form column */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                    >
                        {submitted ? (
                            <motion.div
                                className="glass-card p-10 text-center flex flex-col items-center gap-4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="w-14 h-14 rounded-full bg-[#34D399]/10 flex items-center justify-center text-2xl text-[#34D399]">
                                    ✓
                                </div>
                                <h3 className="text-white font-bold text-xl">Message received!</h3>
                                <p className="text-[#8A8AAA] text-sm">We&apos;ll reply within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass-card p-7 flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className={inputClass}
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className={inputClass}
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    className={inputClass}
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    required
                                />
                                <select
                                    className={inputClass}
                                    style={{ background: 'rgba(255,255,255,0.04)' }}
                                    value={form.service}
                                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                                    required
                                >
                                    <option value="" style={{ background: '#09091A' }}>Select a service</option>
                                    <option value="Web Development" style={{ background: '#09091A' }}>Web Development</option>
                                    <option value="Mobile Apps" style={{ background: '#09091A' }}>Mobile Apps</option>
                                    <option value="UI/UX Design" style={{ background: '#09091A' }}>UI/UX Design</option>
                                    <option value="Digital Marketing" style={{ background: '#09091A' }}>Digital Marketing</option>
                                    <option value="Cloud & DevOps" style={{ background: '#09091A' }}>Cloud & DevOps</option>
                                    <option value="Maintenance & Security" style={{ background: '#09091A' }}>Maintenance & Security</option>
                                </select>
                                <textarea
                                    placeholder="Tell us about your project..."
                                    rows={4}
                                    className={inputClass}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn-primary w-full py-4 text-base"
                                >
                                    Send Message →
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
