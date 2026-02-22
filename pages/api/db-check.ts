// pages/api/db-check.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPool } from '@/lib/db';

const environment = process.env.NODE_ENV;
const dbUrl = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
const isVercel =
  typeof dbUrl === 'string' && !dbUrl.includes('localhost');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = getPool();
    let { rows } = await db.query('select now() as now');
    const now = rows[0]?.now;
    ({ rows } = await db.query('SELECT artist FROM albums LIMIT 1'));
    const artist = rows[0]?.artist;

    const message = isVercel
      ? `Lauren Hutchens — Vercel music connection success. Artist query successful. Running in ${environment}.`
      : `Lauren Hutchens — Music database connection success on localhost. Artist query successful. Running in ${environment}.`;

    res.status(200).json({
      time: now,
      artist,
      connection: isVercel ? 'Vercel' : 'localhost',
      message,
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    res.status(500).json({
      error: 'Database connection failed',
      details: (err as Error).message,
      message: `Lauren Hutchens Database connection failed. Running in ${environment}. DATABASE_URL: ${dbUrl}`,
    });
  }
}
