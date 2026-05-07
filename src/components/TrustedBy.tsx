"use client"

import { motion } from 'framer-motion'

const clients = [
    { name: 'VedhasKitchen' },
    { name: 'PowerHouse Events' },
    { name: 'PH Crackers' },
    { name: 'FitZone Gym' },
    { name: 'Skyline Constructions' },
    { name: 'BrightPath Coaching' },
    { name: 'SpiceRoute Restaurant' },
    { name: 'TechNest Solutions' },
    { name: 'GreenLeaf Organics' },
    { name: 'Nova Interiors' },
    { name: 'SwiftCargo Logistics' },
    { name: 'MediCare Clinic' },
    { name: 'StarCraft Jewellers' },
    { name: 'UrbanEdge Realty' },
    { name: 'BlueWave Travels' },
]

export default function TrustedBy() {
    const doubled = [...clients, ...clients]

    return (
        <section className="py-16 overflow-hidden border-y border-white/[0.05]" style={{ background: 'rgba(13,13,32,0.6)' }}>
            <p className="text-center text-xs font-semibold tracking-[0.15em] text-[#8A8AAA] uppercase mb-8">
                Trusted by growing businesses across India
            </p>
            <div className="relative flex">
                {/* Fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
                    style={{ background: 'linear-gradient(to right, #05050F, transparent)' }} />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
                    style={{ background: 'linear-gradient(to left, #05050F, transparent)' }} />

                <motion.div
                    className="flex shrink-0 gap-10 pr-10"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                >
                    {doubled.map((client, index) => (
                        <span
                            key={index}
                            className="whitespace-nowrap text-sm font-semibold text-[#8A8AAA] hover:text-white transition-colors duration-200 flex items-center gap-3"
                        >
                            <span className="w-1 h-1 rounded-full bg-[#7C5CFC] inline-block" />
                            {client.name}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
