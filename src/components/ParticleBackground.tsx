"use client"

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animId: number
        let t = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const orbs = [
            { baseX: 0.25, baseY: 0.35, r: 0.55, color: '#6C63FF', speed: 0.0004, amp: 0.08, phase: 0 },
            { baseX: 0.75, baseY: 0.55, r: 0.5, color: '#00D4AA', speed: 0.0003, amp: 0.07, phase: 1.5 },
            { baseX: 0.5, baseY: 0.2, r: 0.4, color: '#6C63FF', speed: 0.0005, amp: 0.06, phase: 3 },
            { baseX: 0.15, baseY: 0.75, r: 0.35, color: '#00D4AA', speed: 0.00035, amp: 0.05, phase: 4.5 },
        ]

        const hexToRgb = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            return { r, g, b }
        }

        const draw = () => {
            const w = canvas.width
            const h = canvas.height
            t += 1

            ctx.fillStyle = '#0A0A0A'
            ctx.fillRect(0, 0, w, h)

            for (const orb of orbs) {
                const cx = (orb.baseX + Math.sin(t * orb.speed + orb.phase) * orb.amp) * w
                const cy = (orb.baseY + Math.cos(t * orb.speed * 0.7 + orb.phase) * orb.amp) * h
                const radius = orb.r * Math.min(w, h)

                const { r, g, b } = hexToRgb(orb.color)
                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
                grad.addColorStop(0, `rgba(${r},${g},${b},0.55)`)
                grad.addColorStop(0.4, `rgba(${r},${g},${b},0.2)`)
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`)

                ctx.beginPath()
                ctx.arc(cx, cy, radius, 0, Math.PI * 2)
                ctx.fillStyle = grad
                ctx.fill()
            }

            animId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
        />
    )
}
