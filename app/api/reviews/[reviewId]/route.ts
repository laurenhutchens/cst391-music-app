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
    const { rating, comment } = body;

    if (rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 5)) {
      return NextResponse.json({ error: 'rating must be an integer between 1 and 5' }, { status: 400 });
    }

    const pool = getPool();

    // Build SET clause dynamically based on provided fields
    const setClauses: string[] = ['updated_at = NOW()'];
    const values: unknown[] = [];

    if (rating !== undefined) {
      values.push(rating);
      setClauses.push(`rating = $${values.length}`);
    }
    if (comment !== undefined) {
      values.push(comment);
      setClauses.push(`comment = $${values.length}`);
    }

    values.push(reviewIdNum);
    const res = await pool.query(
      `UPDATE reviews SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('PATCH /api/reviews/[reviewId] error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  try {
    const { reviewId } = await params;
    const reviewIdNum = parseInt(reviewId, 10);
    if (isNaN(reviewIdNum)) {
      return NextResponse.json({ error: 'Invalid reviewId' }, { status: 400 });
    }

    const pool = getPool();
    await pool.query('DELETE FROM reviews WHERE id = $1', [reviewIdNum]);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/reviews/[reviewId] error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
