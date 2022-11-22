import { render, screen } from '@testing-library/react';

import AlbumTrackList from '@/components/AlbumTrackList';

describe('card', () => {
    const externalUrls: SpotifyApi.ExternalUrlObject = {
        spotify: ''
    }
    const track: SpotifyApi.TrackObjectSimplified = {
        artists: [],
        disc_number: 0,
        duration_ms: 0,
        explicit: false,
        external_urls: externalUrls,
        href: '',
        id: '',
        name: 'test',
        preview_url: null,
        track_number: 0,
        type: 'track',
        uri: ''
    }

  it('render content', () => {
    render(
      <AlbumTrackList tracks={[track]}      />
    );

    const name = screen.getAllByText(/Test/i)[0]
    expect(name).toBeInTheDocument();
  });
});
