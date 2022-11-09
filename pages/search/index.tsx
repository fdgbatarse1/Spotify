import Header from '@/components/Header';
import AlbumsPrev from '@/components/Section/AlbumsPrev';
import TracksPrev from '@/components/Section/TracksPrev';
import ArtistsPrev from '@/components/Section/ArtistsPrev';

import useSearchAlbum from '@/hooks/useSearchAlbum';
import useSearchTrack from '@/hooks/useSearchTrack';
import useSearchArtist from '@/hooks/useSearchArtist';
import useCheckStatus from '@/hooks/useCheckStatus';

import { useAppSelector } from '@/lib/reduxHooks';
import { useEffect } from 'react';
import { setAlbums } from '@/store/features/albums/albumsSlice';
import { setArtists } from '@/store/features/artists/artistsSlice';
import { setTracks } from '@/store/features/tracks/tracksSlice';
import { useDispatch } from 'react-redux';

const Search = () => {
  useSearchAlbum(false);
  useSearchTrack(false);
  useSearchArtist(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAlbums(null));
    dispatch(setArtists(null));
    dispatch(setTracks(null));
  }, [dispatch]);

  const albums = useAppSelector((state) => state.albums.albums);
  const tracks = useAppSelector((state) => state.tracks.tracks);
  const artists = useAppSelector((state) => state.artists.artists);
  const searchStatus = useAppSelector((state) => state.search.searchStatus);
  const searchError = useAppSelector((state) => state.search.searchError);

  const unsuccess = useCheckStatus(searchStatus, searchError);

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <Header goBack={true} search={true} />
      {unsuccess && <div className='flex-auto'>{unsuccess}</div>}
      {!unsuccess && tracks && tracks?.total > 0 && <TracksPrev title='Tracks' href='/search/tracks' />}
      {!unsuccess && albums && albums?.total > 0 && (
        <AlbumsPrev title='Albums' href='/search/albums' />
      )}
      {!unsuccess && artists && artists?.total > 0 && (
        <ArtistsPrev title='Artists' href='/search/artists' />
      )}
      {!unsuccess && <div className='pb-6'></div>}
    </div>
  );
};

export default Search;
