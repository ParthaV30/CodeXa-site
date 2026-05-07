"use client"

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

export default function FloatingCTA() {
    return (
        <motion.a
            href="#contact"
            className="fixed bottom-8 right-8 z-50 bg-[#6C63FF] text-white px-5 py-3 rounded-full flex items-center gap-2.5 font-semibold shadow-lg shadow-[#6C63FF]/40 hover:bg-[#5a52e6] transition-colors"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <Phone className="w-4 h-4" />
            Book a Call
        </motion.a>
    )
}
