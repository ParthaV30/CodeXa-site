import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
    const { name, email, phone, service, message } = await request.json()

    const key = process.env.RESEND_API_KEY
    if (!key) {
        return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    const resend = new Resend(key)

    try {
        await resend.emails.send({
            from: 'hello@rturox.com',
            to: process.env.CONTACT_EMAIL || 'hello@rturox.com',
            subject: `New contact from ${name}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
}