import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export function sign(userId: number) {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: '7d' });
}

export function verify(token: string) {
  return jwt.verify(token, SECRET) as { id: number };
}
