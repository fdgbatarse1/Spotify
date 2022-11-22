import { render, screen } from '@testing-library/react';

import AlbumTrackItem from '@/components/AlbumTrackItem';

describe('card', () => {
  it('render content', () => {
    render(
      <AlbumTrackItem 
      href={'/'}
      name='Test' 
      artists='Test artist' 
      duration='1:00'      
      />
    );

    const name = screen.getAllByText(/Test/i)[0]
    const artists = screen.getByText(/Test artist/i)
    const duration = screen.getByText(/1:00/i);

    expect(name).toBeInTheDocument();
    expect(artists).toBeInTheDocument();
    expect(duration).toBeInTheDocument();
  });
});
