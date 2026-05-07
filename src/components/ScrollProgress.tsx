"use client"

import { useScroll, motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #6C63FF, #00D4AA)',
                boxShadow: '0 0 10px rgba(108,99,255,0.8)',
            }}
        />
    )
}
