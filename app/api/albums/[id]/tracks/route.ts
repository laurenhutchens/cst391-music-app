import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const albumId = parseInt(id, 10);
  if (isNaN(albumId)) {
    return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
  }
  try {
    const pool = getPool();
    const res = await pool.query(
      'SELECT * FROM tracks WHERE album_id = $1 ORDER BY number',
      [albumId]
    );
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(`GET /api/albums/${albumId}/tracks error:`, error);
    return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const albumId = parseInt(id, 10);
  if (isNaN(albumId)) {
    return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
  }
  try {
    const body = await request.json();
    const { title, number, lyrics, video_url } = body;
    if (!title || number == null) {
      return NextResponse.json({ error: 'title and number are required' }, { status: 400 });
    }
    const pool = getPool();
    const res = await pool.query(
      'INSERT INTO tracks (album_id, title, number, lyrics, video_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [albumId, title, number, lyrics ?? null, video_url ?? null]
    );
    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (error) {
    console.error(`POST /api/albums/${albumId}/tracks error:`, error);
    return NextResponse.json({ error: 'Failed to create track' }, { status: 500 });
  }
}
