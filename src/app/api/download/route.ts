import { NextRequest, NextResponse } from 'next/server';

const DOWNLOAD_URLS: Record<string, { url: string; filename: string }> = {
    mac: {
        url: 'https://api.openanalyst.com/OpenAnalyst.dmg',
        filename: 'OpenAnalyst.dmg',
    },
    windows: {
        url: 'https://api.openanalyst.com/OpenAnalyst-setup.exe',
        filename: 'OpenAnalyst-setup.exe',
    },
};

export async function GET(request: NextRequest) {
    const platform = request.nextUrl.searchParams.get('platform') || 'mac';

    const entry = DOWNLOAD_URLS[platform];
    if (!entry) {
        return NextResponse.json(
            { error: 'Download not available for this platform yet.' },
            { status: 404 },
        );
    }

    const upstream = await fetch(entry.url, { redirect: 'follow' });

    if (!upstream.ok) {
        return NextResponse.json(
            { error: 'Download temporarily unavailable. Please try again later.' },
            { status: 502 },
        );
    }

    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${entry.filename}"`);
    headers.set('Content-Type', upstream.headers.get('Content-Type') || 'application/octet-stream');
    if (upstream.headers.has('Content-Length')) {
        headers.set('Content-Length', upstream.headers.get('Content-Length')!);
    }
    // Prevent caching of the binary
    headers.set('Cache-Control', 'no-store');

    return new NextResponse(upstream.body, { status: 200, headers });
}
