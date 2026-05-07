"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = ['Home', 'Services', 'Work', 'Pricing', 'Contact']

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            className="fixed top-0 w-full z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Desktop nav */}
            <div className={`mx-auto mt-4 max-w-6xl px-4 transition-all duration-300 hidden md:block`}>
                <div className={`flex justify-between items-center px-6 py-3 rounded-2xl border transition-all duration-300 ${
                    isScrolled
                        ? 'bg-[#05050F]/80 backdrop-blur-xl border-white/10 shadow-xl shadow-black/40'
                        : 'bg-white/[0.03] backdrop-blur-md border-white/[0.07]'
                }`}>
                    <a href="#" className="flex items-center">
                        <span className="text-2xl font-black bg-gradient-to-r from-[#7C5CFC] to-[#06D6F0] bg-clip-text text-transparent tracking-tight">RTUROX</span>
                    </a>

                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-sm text-[#8A8AAA] hover:text-white transition-colors duration-200 font-medium"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <a
                        href="#contact"
                        className="btn-primary text-sm px-5 py-2.5"
                    >
                        Start a Project →
                    </a>
                </div>
            </div>

            {/* Mobile nav */}
            <div className="md:hidden">
                <div className={`flex justify-between items-center px-5 py-4 transition-all duration-300 ${
                    isScrolled ? 'bg-[#05050F]/90 backdrop-blur-xl border-b border-white/[0.07]' : ''
                }`}>
                    <a href="#" className="flex items-center">
                        <span className="text-xl font-black bg-gradient-to-r from-[#7C5CFC] to-[#06D6F0] bg-clip-text text-transparent tracking-tight">RTUROX</span>
                    </a>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white p-1"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="bg-[#05050F]/95 backdrop-blur-xl border-b border-white/[0.07]"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-5 pb-6 pt-2 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <a
                                        key={link}
                                        href={`#${link.toLowerCase()}`}
                                        className="block px-4 py-3 text-[#8A8AAA] hover:text-white rounded-xl hover:bg-white/[0.04] transition-all text-sm font-medium"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link}
                                    </a>
                                ))}
                                <a
                                    href="#contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="btn-primary text-sm text-center mt-3 py-3"
                                >
                                    Start a Project →
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}
