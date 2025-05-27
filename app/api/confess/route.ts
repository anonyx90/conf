import { prisma } from '@/lib/prisma';
import { verify } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const token = auth?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 });

  try {
    const { id } = verify(token);
    const { message } = await req.json();

    const confession = await prisma.confession.create({
      data: { message, userId: id },
    });

    return NextResponse.json(confession);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
