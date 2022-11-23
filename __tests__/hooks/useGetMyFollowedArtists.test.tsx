import useGetMyFollowedArtists from '@/hooks/useGetMyFollowedArtists';

describe('Testing useGetArtistTopTracks', () => {
  it('should be defined', () => {
    expect(useGetMyFollowedArtists).toBeDefined();
  });
});
