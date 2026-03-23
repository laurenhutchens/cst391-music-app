import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export const runtime = 'nodejs';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  try {
    const { reviewId } = await params;
    const reviewIdNum = parseInt(reviewId, 10);
    if (isNaN(reviewIdNum)) {
      return NextResponse.json({ error: 'Invalid reviewId' }, { status: 400 });
    }

    const body = await request.json();
    const { is_hidden } = body;

    if (typeof is_hidden !== 'boolean') {
      return NextResponse.json({ error: 'is_hidden must be a boolean' }, { status: 400 });
    }

    const pool = getPool();
    const res = await pool.query(
      `UPDATE reviews SET is_hidden = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [is_hidden, reviewIdNum]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('PATCH /api/admin/reviews/[reviewId]/hide error:', error);
    return NextResponse.json({ error: 'Failed to update review visibility' }, { status: 500 });
  }
}
