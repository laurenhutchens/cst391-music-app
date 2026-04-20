import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { Album, Track } from '@/lib/types';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const pool = getPool();
    const albumsRes = await pool.query(
      'SELECT * FROM albums WHERE LOWER(artist) = LOWER($1)',
      [id]
    );
    const albumsData = albumsRes.rows;
    if (albumsData.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const albumIds = albumsData.map(a => a.id);
    const tracksRes = await pool.query(
      'SELECT * FROM tracks WHERE album_id = ANY($1) ORDER BY number',
      [albumIds]
    );

    const tracksByAlbum: Record<number, Track[]> = {};
    for (const track of tracksRes.rows) {
      (tracksByAlbum[track.album_id] ||= []).push({
        id: track.id,
        number: track.number,
        title: track.title,
        lyrics: track.lyrics,
        video: track.video_url,
      });
    }

    const result: Album[] = albumsData.map(album => ({
      id: album.id,
      title: album.title,
      artist: album.artist,
      year: album.year,
      image: album.image,
      description: album.description,
      tracks: tracksByAlbum[album.id] || [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(`GET /api/albums/${id} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch albums by artist' }, { status: 500 });
  }
}

export async function DELETE(
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
    const del = await pool.query('DELETE FROM albums WHERE id = $1 RETURNING id', [albumId]);
    if (del.rowCount === 0) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json({ message: `Album ${albumId} deleted` });
  } catch (error) {
    console.error(`DELETE /api/albums/${albumId} error:`, error);
    return NextResponse.json({ error: 'Failed to delete album' }, { status: 500 });
  }
}
