import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export const runtime = 'nodejs';

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
    console.error('DELETE /api/admin/reviews/[reviewId] error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
