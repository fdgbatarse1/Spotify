import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import FavoriteAlbumsPrev from '@/components/Section/FavoriteAlbumsPrev';
import FavoriteTracksPrev from '@/components/Section/FavoriteTracksPrev';

import useCheckStatus from '@/hooks/useCheckStatus';
import useGetMySavedAlbums from '@/hooks/useGetMySavedAlbums';
import useGetMySavedTracks from '@/hooks/useGetMySavedTracks';

import { NotFound } from '@/lib/enums';

import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';
import useGetMyPlaylists from '@/hooks/useGetMyPlaylists';
import MyPlaylistsPrev from '@/components/Section/MyPlaylistsPrev';

const YourLibrary = () => {
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useGetMySavedAlbums(false);
  useGetMySavedTracks(false);
  useGetMyPlaylists(false);

  const myPlaylists = useAppSelector((state) => state.playlists.playlists);
  const favoriteAlbums = useAppSelector((state) => state.favorites.favoriteAlbums);
  const favoriteTracks = useAppSelector((state) => state.favorites.favoriteTracks);

  useEffect(() => {
    if (favoriteAlbums?.items?.length && favoriteTracks?.items?.length) {
      if (favoriteAlbums?.items?.length > 0 || favoriteTracks?.items?.length > 0) {
        setStatus(Status.FULFILLED);
      } else {
        setStatus(Status.REJECTED);
      }
    } else {
      setStatus(Status.REJECTED);
    }
  }, [favoriteAlbums, favoriteTracks]);

  const unsuccess = useCheckStatus(status, NotFound.notFound);

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <Header goBack={true} createPlaylist={true} />
      {unsuccess && <div className='flex-auto'>{unsuccess}</div>}
      {!unsuccess && favoriteAlbums && favoriteAlbums?.total > 0 && (
        <FavoriteAlbumsPrev title='Favorite Albums' href='/your-library/albums' />
      )}
      {!unsuccess && favoriteTracks && favoriteTracks?.total > 0 && (
        <FavoriteTracksPrev title='Favorite Tracks' href='/your-library/tracks' />
      )}
      {!unsuccess && myPlaylists && myPlaylists?.total > 0 && (
        <MyPlaylistsPrev title='My Playlists' href='/your-library/playlists'></MyPlaylistsPrev>
      )}
      {!unsuccess && <div className='pb-6'></div>}
    </div>
  );
};

export default YourLibrary;
