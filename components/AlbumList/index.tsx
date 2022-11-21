import useGetAlbumTracks from "@/hooks/useGetAlbumTracks";

import { useAppSelector } from "@/lib/reduxHooks";

import AlbumTrackList from "../AlbumTrackList";

const AlbumList = () => {
  const albumTracks = useAppSelector((state) => state.albums.albumTracks);
  const album = useAppSelector((state) => state.albums.album);

  useGetAlbumTracks();
  return <AlbumTrackList tracks={albumTracks?.items} album={album} />;
};

export default AlbumList;
