import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackId: string }> }
) {
  try {
    const { trackId } = await params;
    const trackIdNum = parseInt(trackId, 10);
    if (isNaN(trackIdNum)) {
      return NextResponse.json({ error: 'Invalid trackId' }, { status: 400 });
    }

    const url = new URL(request.url);
    const showHidden = url.searchParams.get('showHidden') === 'true';

    const pool = getPool();
    const query = `
      SELECT r.id, r.track_id, r.user_id, r.rating, r.comment, r.is_hidden,
             r.created_at, r.updated_at, u.email AS user_email
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.track_id = $1
        ${showHidden ? '' : 'AND r.is_hidden = FALSE'}
      ORDER BY r.created_at DESC
    `;
    const res = await pool.query(query, [trackIdNum]);
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('GET /api/tracks/[trackId]/reviews error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ trackId: string }> }
) {
  try {
    const { trackId } = await params;
    const trackIdNum = parseInt(trackId, 10);
    if (isNaN(trackIdNum)) {
      return NextResponse.json({ error: 'Invalid trackId' }, { status: 400 });
    }

    const body = await request.json();
    const { user_id, rating, comment } = body;

    if (rating == null || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'rating must be an integer between 1 and 5' }, { status: 400 });
    }

    const pool = getPool();
    const res = await pool.query(
      `INSERT INTO reviews (track_id, user_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [trackIdNum, user_id ?? null, rating, comment ?? null]
    );
    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/tracks/[trackId]/reviews error:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
