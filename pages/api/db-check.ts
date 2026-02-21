// pages/api/db-check.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPool } from '@/lib/db';

const environment = process.env.NODE_ENV;
const dbUrl = process.env.DATABASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = getPool();
    const { rows } = await db.query('select now() as now');

    res.status(200).json({
      time: rows[0],
      message: `Lauren Hutchens — Connection successful to local Vercel. Database connected. Running in ${environment}.`,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Database connection failed',
      details: (err as Error).message,
      message: `Lauren Hutchens — Database connection failed. Running in ${environment}. DATABASE_URL: ${dbUrl}`,
    });
  }
}
