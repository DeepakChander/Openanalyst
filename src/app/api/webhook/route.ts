import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://n8n.1to10x.ai/webhook/openanalyst-waitlist-lead';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Webhook request failed' },
                { status: response.status }
            );
        }

        const data = await response.text();
        return NextResponse.json({ success: true, data });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
