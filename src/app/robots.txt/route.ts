export async function GET() {
    return new Response(`User-agent: *
Allow: /
Sitemap: https://rturox.com/sitemap.xml`, {
        headers: { 'Content-Type': 'text/plain' },
    })
}