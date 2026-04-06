'use client';

import { useState } from "react";
import { Album } from "@/lib/types";
import AlbumList from "./AlbumList";

interface SearchAlbumProps {
  albumList: Album[];
  updateSearchResults: (phrase: string) => void;
  updateSingleAlbum: (album: Album, uri: string) => void;
}

export default function SearchAlbum({ albumList, updateSearchResults, updateSingleAlbum }: SearchAlbumProps) {
  const [inputText, setInputText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputText(value);
    updateSearchResults(value);
  };

  const filteredList = albumList.filter((album) =>
    inputText === "" ||
    (album.description ?? "").toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="form-group my-3">
        <label htmlFor="search-term">Search for</label>
        <input
          type="text"
          id="search-term"
          className="form-control"
          placeholder="Enter search term here"
          value={inputText}
          onChange={handleChange}
        />
      </div>
      <AlbumList albumList={filteredList} onClick={updateSingleAlbum} />
    </div>
  );
}
