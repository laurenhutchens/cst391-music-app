import { Album } from "@/lib/types";
import AlbumCard from "./AlbumCard";

interface AlbumListProps {
  albumList: Album[];
  onClick: (album: Album, uri: string) => void;
}

export default function AlbumList({ albumList, onClick }: AlbumListProps) {
  return (
    <div className="container d-flex flex-wrap">
      {albumList.map((album) => (
        <AlbumCard key={album.id} album={album} onClick={onClick} />
      ))}
    </div>
  );
}
