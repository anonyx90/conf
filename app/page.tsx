'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchConfessions } from '@/lib/api';

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['confessions'],
    queryFn: fetchConfessions,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading confessions</p>;

  return (
    <div>
      <h1>Confessions</h1>
      <ul>
        {data.map((confession: { id: number; message: string }) => (
          <li key={confession.id}>{confession.message}</li>
        ))}
      </ul>
    </div>
  );
}
