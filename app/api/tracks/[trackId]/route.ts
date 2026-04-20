import { NextRequest, NextResponse } from 'next/server';
  import { getPool } from '@/lib/db';

  export const runtime = 'nodejs';

  export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ trackId: string }> }
  ) {
    const { trackId } = await context.params;
    const id = parseInt(trackId, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid track ID' }, { status: 400 });
    }
    try {
      const body = await request.json();
      const { title, number, video_url, lyrics } = body;
      const pool = getPool();
      const res = await pool.query(
        `UPDATE tracks
         SET title     = COALESCE($1, title),
             number    = COALESCE($2, number),
             video_url = COALESCE($3, video_url),
             lyrics    = COALESCE($4, lyrics)
         WHERE id = $5
         RETURNING *`,
        [title ?? null, number ?? null, video_url ?? null, lyrics ?? null, id]
      );
      if (res.rowCount === 0) {
        return NextResponse.json({ error: 'Track not found' }, { status: 404 });
      }
      return NextResponse.json(res.rows[0]);
    } catch (error) {
      console.error(`PATCH /api/tracks/${id} error:`, error);
      return NextResponse.json({ error: 'Failed to update track' }, { status: 500 });
    }
  }

  export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ trackId: string }> }
  ) {
    const { trackId } = await context.params;
    const id = parseInt(trackId, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid track ID' }, { status: 400 });
    }
    try {
      const pool = getPool();
      const res = await pool.query('DELETE FROM tracks WHERE id = $1 RETURNING id', [id]);
      if (res.rowCount === 0) {
        return NextResponse.json({ error: 'Track not found' }, { status: 404 });
      }
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      console.error(`DELETE /api/tracks/${id} error:`, error);
      return NextResponse.json({ error: 'Failed to delete track' }, { status: 500 });
    }
  }