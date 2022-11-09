const convertPlaylistTracks = (playlistTracks: SpotifyApi.PlaylistTrackResponse | null) => {
  if (!playlistTracks) return undefined;

  let newTracks: SpotifyApi.TrackObjectFull[] = [];

  playlistTracks.items.forEach((playlistTrack) => {
    if (playlistTrack?.track) {
      newTracks.push(playlistTrack.track);
    }
  });

  return newTracks;
};

export default convertPlaylistTracks;
