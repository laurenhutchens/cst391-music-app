const BASE = 'http://localhost:3000/api';

const albums = [
  {
    albumId: 3, title: 'Rubber Soul', artist: 'The Beatles', year: 1965,
    description: 'Rubber Soul is the sixth studio album by the English rock band the Beatles, released on 3 December 1965.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/af/20/aa/af20aa89-4002-11fb-25d8-ff544af67eb4/00602567725404.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 4, title: 'Please Please Me', artist: 'The Beatles', year: 1963,
    description: 'Please Please Me is the debut studio album by the English rock band the Beatles, released on 22 March 1963.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9c/ff/b5/9cffb5a6-a37f-c84a-7240-0333a071bc92/00602567725275.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 5, title: 'With the Beatles', artist: 'The Beatles', year: 1963,
    description: 'With the Beatles is the second studio album by the English rock band the Beatles.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/03/02/d2/0302d204-77c1-0c87-e03a-698bd31cf038/00602567725619.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 6, title: "A Hard Day's Night", artist: 'The Beatles', year: 1964,
    description: "A Hard Day's Night is the third studio album by the English rock band the Beatles, released on 10 July 1964.",
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/a2/7a/dba27a46-3685-508d-d32e-a0e73cc82251/00602567713296.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 7, title: 'Help!', artist: 'The Beatles', year: 1965,
    description: 'Help! is the fifth studio album by the English rock band the Beatles, released on 6 August 1965.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/1a/19/db/1a19db26-17ad-b986-11a9-f72ac7a6194b/18UMGIM31214.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 8, title: "Sgt. Pepper's Lonely Hearts Club Band", artist: 'The Beatles', year: 1967,
    description: "Sgt. Pepper's Lonely Hearts Club Band is the eighth studio album by the English rock band the Beatles, released on 26 May 1967.",
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/6f/79/8d/6f798d84-7475-8525-fc91-f7b51b2b5a9b/00602567725428.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 9, title: 'Magical Mystery Tour', artist: 'The Beatles', year: 1967,
    description: 'Magical Mystery Tour is the eleventh studio album by the English rock band the Beatles, released on 27 November 1967.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/43/0e/37/430e3790-75d5-c96a-1380-f9d9803aa700/18UMGIM31245.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 10, title: 'The Beatles (White Album)', artist: 'The Beatles', year: 1968,
    description: 'The Beatles, commonly known as the White Album, is the ninth studio album by the English rock band the Beatles, released on 22 November 1968.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fa/5b/89/fa5b898d-bad6-e053-4195-260e5c74f2bb/00602567725466.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 11, title: 'Yellow Submarine', artist: 'The Beatles', year: 1969,
    description: 'Yellow Submarine is the tenth studio album by the English rock band the Beatles, released on 13 January 1969.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b1/94/f3/b194f3c3-3bcf-62f6-a795-093a3d3c0407/00602567725640.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 12, title: 'Abbey Road', artist: 'The Beatles', year: 1969,
    description: 'Abbey Road is the eleventh studio album by the English rock band the Beatles, released on 26 September 1969 by Apple Records.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/48/53/43/485343e3-dd6a-0034-faec-f4b6403f8108/13UMGIM63890.rgb.jpg/500x500bb.jpg'
  },
  {
    albumId: 13, title: 'Let It Be', artist: 'The Beatles', year: 1970,
    description: 'Let It Be is the twelfth and final studio album by the English rock band the Beatles, released on 8 May 1970.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5f/ff/9a/5fff9a6a-bb13-6507-5e68-2793ef798834/21UMGIM61121.rgb.jpg/500x500bb.jpg'
  },
];

(async () => {
  for (const album of albums) {
    const res = await fetch(`${BASE}/albums`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album),
    });
    const json = await res.json();
    if (res.ok) {
      console.log(`✓ Updated image for album ${album.albumId} (${album.title})`);
    } else {
      console.error(`✗ Failed album ${album.albumId}: ${JSON.stringify(json)}`);
    }
  }
  console.log('Done.');
})();
