// app/api/send/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const { to, subject, text } = body;

  try {
    const result = await resend.emails.send({
      from: 'HULU GENERAL <onboarding@resend.dev>',
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    let errorMessage = 'Failed to send email';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
