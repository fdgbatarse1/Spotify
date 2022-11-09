const singlePlaylistResponseHelper = (playlist: SpotifyApi.SinglePlaylistResponse | null) => {
  interface InewPlaylist {
    type: 'playlist';
    image: string;
    name: string;
    owner: string;
    description: string;
    public: string;
    tracks: SpotifyApi.PlaylistTrackObject[] | [];
    id: string | undefined;
  }

  const notFoundItems: InewPlaylist = {
    type: 'playlist',
    image:
      'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',
    name: 'Unknown',
    owner: 'Unknown',
    description: 'No description',
    tracks: [],
    public: 'Unknown',
    id: undefined,
  };

  if (!playlist) {
    return {
      ...notFoundItems,
    };
  }

  const newPlaylist: InewPlaylist = {
    type: playlist?.type || notFoundItems.type,
    image: playlist?.images.length > 0 ? playlist?.images[0].url : notFoundItems.image,
    name: playlist?.name || notFoundItems.name,
    owner: playlist?.owner?.id || notFoundItems.owner,
    description: playlist?.description?.replace(/<\/?[^>]+(>|$)/g, '') || notFoundItems.description,
    tracks: playlist?.tracks?.items || notFoundItems.tracks,
    public: playlist?.public ? 'Public' : 'Private',
    id: playlist?.id || notFoundItems.id,
  };

  return newPlaylist;
};

export default singlePlaylistResponseHelper;
