import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const existing = await prisma.user.findUnique({ where: { username } });

  if (existing) return NextResponse.json({ error: 'Username taken' }, { status: 400 });

  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { username, password: hash } });

  return NextResponse.json({ success: true });
}
