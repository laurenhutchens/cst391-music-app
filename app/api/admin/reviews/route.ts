import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const trackIdParam = url.searchParams.get('track_id');
    const isHiddenParam = url.searchParams.get('is_hidden');

    const conditions: string[] = [];
    const values: unknown[] = [];

    if (trackIdParam) {
      const trackIdNum = parseInt(trackIdParam, 10);
      if (isNaN(trackIdNum)) {
        return NextResponse.json({ error: 'Invalid track_id' }, { status: 400 });
      }
      values.push(trackIdNum);
      conditions.push(`r.track_id = $${values.length}`);
    }

    if (isHiddenParam !== null) {
      values.push(isHiddenParam === 'true');
      conditions.push(`r.is_hidden = $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const pool = getPool();
    const res = await pool.query(
      `SELECT r.id, r.track_id, r.user_id, r.rating, r.comment, r.is_hidden,
              r.created_at, r.updated_at,
              t.title AS track_title,
              a.title AS album_title,
              u.email AS user_email
       FROM reviews r
       LEFT JOIN tracks t ON r.track_id = t.id
       LEFT JOIN albums a ON t.album_id = a.id
       LEFT JOIN users u ON r.user_id = u.id
       ${whereClause}
       ORDER BY r.created_at DESC`,
      values
    );
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('GET /api/admin/reviews error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
