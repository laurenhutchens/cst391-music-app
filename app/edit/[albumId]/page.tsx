// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { get } from "@/lib/apiClient";
import { Album } from "@/lib/types";
import NavBar from "@/app/components/NavBar";
import { useRouter } from "next/navigation";

export default function Page() {
  const [albumList, setAlbumList] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);
  let router = useRouter();

  const loadAlbums = async () => {
    try {
      const data = await get<Album[]>("/api/albums");
      setAlbumList(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  return (
    <main>
      <NavBar />
      <h1>Sparks Album List (Debug View) — Lauren Hutchens</h1>
      <p>This JSON data is rendered directly from the API response.</p>

      {error ? (
        <div style={{
          backgroundColor: "#ffe0e0",
          padding: "1rem",
          borderRadius: "8px",
          color: "red",
          fontWeight: "bold",
        }}>
          Error: {error}
        </div>
      ) : (
        <pre style={{
          backgroundColor: "#f4f4f4",
          padding: "1rem",
          borderRadius: "8px",
          overflow: "auto",
          color: "#111",
          fontSize: "0.9rem",
          lineHeight: "1.4",
        }}>
          {albumList.length > 0 && JSON.stringify(albumList, null, 2)}
        </pre>
      )}

      {albumList.length === 0 && !error && <p>Loading albums...</p>}
    </main>
  );
}