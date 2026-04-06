'use client';

import { Suspense, useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { get, put } from "@/lib/apiClient";
import { Album } from "@/lib/types";
import NavBar from "@/app/components/NavBar";

function EditAlbumInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const albumId = (params?.albumId ?? "") as string;
  const readOnly = searchParams?.get("mode") === "view";

  const [album, setAlbum] = useState<Album | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    get<Album>(`/albums/${albumId}`)
      .then(setAlbum)
      .catch((err) => setError((err as Error).message));
  }, [albumId]);

  const onChange = (field: keyof Album) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setAlbum((prev) => prev ? { ...prev, [field]: e.target.value } : prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!album) return;
    try {
      await put<Album, Album>(`/albums/${albumId}`, album);
      router.push("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!album) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      <h1>{readOnly ? "View Album" : "Edit Album"}</h1>

      {readOnly ? (
        <div>
          <p><strong>Title:</strong> {album.title}</p>
          <p><strong>Artist:</strong> {album.artist}</p>
          <p><strong>Year:</strong> {album.year}</p>
          <p><strong>Description:</strong> {album.description}</p>
          <p><strong>Image URL:</strong> {album.image}</p>
          <button className="btn btn-secondary" onClick={() => router.push("/")}>
            Home
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label>Title</label>
            <input className="form-control" value={album.title ?? ""} onChange={onChange("title")} />
          </div>
          <div className="form-group my-2">
            <label>Artist</label>
            <input className="form-control" value={album.artist ?? ""} onChange={onChange("artist")} />
          </div>
          <div className="form-group my-2">
            <label>Year</label>
            <input className="form-control" value={album.year ?? ""} onChange={onChange("year")} />
          </div>
          <div className="form-group my-2">
            <label>Description</label>
            <textarea className="form-control" value={album.description ?? ""} onChange={onChange("description")} />
          </div>
          <div className="form-group my-2">
            <label>Image URL</label>
            <input className="form-control" value={album.image ?? ""} onChange={onChange("image")} />
          </div>
          <div className="mt-3">
            <button type="button" className="btn btn-secondary me-2" onClick={() => router.push("/")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function EditAlbumPage() {
  return (
    <main>
      <NavBar />
      <Suspense fallback={<p>Loading...</p>}>
        <EditAlbumInner />
      </Suspense>
    </main>
  );
}
