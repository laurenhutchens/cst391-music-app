"use client";

import { useState, useEffect } from "react";
import { get } from "@/lib/apiClient";
import { Album } from "@/lib/types";
import NavBar from "./components/NavBar";
import SearchAlbum from "./components/SearchAlbum";
import { useRouter } from "next/navigation";

export default function Page() {
  const [albumList, setAlbumList] = useState<Album[]>([]);
  const router = useRouter();

  useEffect(() => {
    get<Album[]>("/albums").then(setAlbumList).catch(console.error);
  }, []);

  return (
    <main>
      <NavBar />
      {albumList.length === 0 && <p>Loading albums...</p>}
      {albumList.length > 0 && (
        <SearchAlbum
          albumList={albumList}
          updateSearchResults={(phrase) => console.log("search:", phrase)}
          updateSingleAlbum={(album, uri) => router.push(`${uri}${album.id}`)}
        />
      )}
    </main>
  );
}
