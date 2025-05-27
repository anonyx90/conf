'use server';

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;  
  }
  return 'http://localhost:3000';                 
};

export const fetchConfessions = async () => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/confessions`);
  if (!response.ok) throw new Error('Failed to fetch confessions');
  return response.json();
};

export const createConfession = async (message: string) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/confess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error('Failed to create confession');
  return response.json();
};
