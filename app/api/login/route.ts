import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sign } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = sign(user.id);
  return NextResponse.json({ token });
}
