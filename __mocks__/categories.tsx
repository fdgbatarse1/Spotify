const categories = [
  {
      "href": "https://api.spotify.com/v1/browse/categories/toplists",
      "icons": [
          {
              "height": 275,
              "url": "https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg",
              "width": 275
          }
      ],
      "id": "toplists",
      "name": "Listas de éxitos"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/latin",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/26a60378-a374-4cd7-b894-28efa5e154cb.jpg",
              "width": null
          }
      ],
      "id": "latin",
      "name": "Latina"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/pop",
      "icons": [
          {
              "height": 274,
              "url": "https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg",
              "width": 274
          }
      ],
      "id": "pop",
      "name": "Pop"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/regional_mexican",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/c765fa1ce6994fce8796d2d0d93c1e61.jpeg",
              "width": null
          }
      ],
      "id": "regional_mexican",
      "name": "Regional Mexicano"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/at_home",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/04da469dd7be4dab96659aa1fa9f0ac9.jpeg",
              "width": null
          }
      ],
      "id": "at_home",
      "name": "En casa"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/inspirational",
      "icons": [
          {
              "height": 274,
              "url": "https://t.scdn.co/media/derived/icon-274x274_5ce6e0f681f0a76f9dcf9270dfd18489_0_0_274_274.jpg",
              "width": 274
          }
      ],
      "id": "inspirational",
      "name": "Música cristiana y góspel"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/salsa",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/33faf792539648da945e9286a1e91492",
              "width": null
          }
      ],
      "id": "salsa",
      "name": "Salsa"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/radar",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/c6677aa51acf4121b66b9d1f231bd427.png",
              "width": null
          }
      ],
      "id": "radar",
      "name": "RADAR"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFPw634sFwguI",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/084155aeaa724ea1bd393a017d67b709",
              "width": null
          }
      ],
      "id": "0JQ5DAqbMKFPw634sFwguI",
      "name": "EQUAL"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/hiphop",
      "icons": [
          {
              "height": 274,
              "url": "https://t.scdn.co/media/original/hip-274_0a661854d61e29eace5fe63f73495e68_274x274.jpg",
              "width": 274
          }
      ],
      "id": "hiphop",
      "name": "Hip hop"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/rnb",
      "icons": [
          {
              "height": 274,
              "url": "https://t.scdn.co/media/derived/r-b-274x274_fd56efa72f4f63764b011b68121581d8_0_0_274_274.jpg",
              "width": 274
          }
      ],
      "id": "rnb",
      "name": "Rhythm & Blues"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/aapi_heritage_month",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/9378062ced4e466980de864ee3cc3bf3",
              "width": null
          }
      ],
      "id": "aapi_heritage_month",
      "name": "Stop Asian Hate"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/workout",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/media/links/workout-274x274.jpg",
              "width": null
          }
      ],
      "id": "workout",
      "name": "Entrenamiento"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/chill",
      "icons": [
          {
              "height": 274,
              "url": "https://t.scdn.co/media/derived/chill-274x274_4c46374f007813dd10b37e8d8fd35b4b_0_0_274_274.jpg",
              "width": 274
          }
      ],
      "id": "chill",
      "name": "Para relajarse"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/wellness",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/3710b68657574bc79df14bd74629e5ac",
              "width": null
          }
      ],
      "id": "wellness",
      "name": "Bienestar"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/focus",
      "icons": [
          {
              "height": 274,
              "url": "https://t.scdn.co/media/original/genre-images-square-274x274_5e50d72b846a198fcd2ca9b3aef5f0c8_274x274.jpg",
              "width": 274
          }
      ],
      "id": "focus",
      "name": "Enfoque"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/party",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/7ee6530d5b3c4acc9a0957046bf11d63",
              "width": null
          }
      ],
      "id": "party",
      "name": "Fiesta"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/decades",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/b611cf5145764c64b80e91ccd5f357c8",
              "width": null
          }
      ],
      "id": "decades",
      "name": "Décadas"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/kids_family",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/664bb84f7a774e1eadb7c227aed98f3c",
              "width": null
          }
      ],
      "id": "kids_family",
      "name": "Niños y familia"
  },
  {
      "href": "https://api.spotify.com/v1/browse/categories/pride",
      "icons": [
          {
              "height": null,
              "url": "https://t.scdn.co/images/c5495b9f0f694ffcb39c9217d4ed4375",
              "width": null
          }
      ],
      "id": "pride",
      "name": "Orgullo"
  }
];

export default categories;
