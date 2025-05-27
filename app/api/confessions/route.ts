import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const all = await prisma.confession.findMany({
    orderBy: { id: 'desc' },
    select: { id: true, message: true },
  });

  return NextResponse.json(all);
}
