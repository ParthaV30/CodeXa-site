"use client"

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (!glowRef.current) return
            glowRef.current.style.left = `${e.clientX - 300}px`
            glowRef.current.style.top = `${e.clientY - 300}px`
        }
        window.addEventListener('mousemove', move, { passive: true })
        return () => window.removeEventListener('mousemove', move)
    }, [])

    return (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
            <div
                ref={glowRef}
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(108,99,255,0.09) 0%, rgba(108,99,255,0.03) 40%, transparent 70%)',
                    transition: 'left 80ms linear, top 80ms linear',
                }}
            />
        </div>
    )
}
