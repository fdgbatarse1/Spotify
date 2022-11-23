interface ISaveTrackForCurrentUser {
  id: string;
  token: string;
}

const SaveTrackForCurrentUser = async ({
  id,
  token,
}: ISaveTrackForCurrentUser) =>
  await fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
    body: JSON.stringify({ ids: [id] }),
    headers: {
      Authorization: "Bearer ".concat(token),
      "Content-Type": "application/json",
    },
    method: "PUT",
  });

export default SaveTrackForCurrentUser;
