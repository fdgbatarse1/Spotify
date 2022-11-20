/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.scdn.co",
      "t.scdn.co",
      "www.flexx.co",
      "www.chicagotribune.com",
      "api.spotify.com",
      "mosaic.scdn.co",
      "blend-playlist-covers.spotifycdn.com",
    ],
  },
};

module.exports = nextConfig;
