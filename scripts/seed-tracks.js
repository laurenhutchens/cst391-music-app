// Seed script: adds sample lyrics and YouTube embed URLs to tracks
const BASE = 'http://localhost:3001/api';

const updates = [
  {
    albumId: 3, title: 'Rubber Soul', artist: 'The Beatles', year: 1965,
    tracks: [
      {
        id: 27, number: 1, title: "I've Just Seen a Face",
        lyrics: "I've just seen a face\nI can't forget the time or place\nWhere we just met\nShe's just the girl for me\nAnd I want all the world to see\nWe've met, mm-mm-mm-m'mm-mm",
        video: 'https://www.youtube.com/embed/4KkAFBPpGbQ'
      },
      {
        id: 28, number: 2, title: 'Norwegian Wood (This Bird Has Flown)',
        lyrics: "I once had a girl\nOr should I say, she once had me\nShe showed me her room\nIsn't it good, Norwegian wood?\n\nShe asked me to stay\nAnd she told me to sit anywhere\nSo I looked around\nAnd I noticed there wasn't a chair",
        video: 'https://www.youtube.com/embed/Y_V6y1ZCg_8'
      },
      {
        id: 32, number: 6, title: 'Michelle',
        lyrics: "Michelle, ma belle\nThese are words that go together well\nMy Michelle\n\nMichelle, ma belle\nSont les mots qui vont très bien ensemble\nTrès bien ensemble",
        video: 'https://www.youtube.com/embed/_7l7jLCkSAY'
      },
      {
        id: 36, number: 10, title: 'In My Life',
        lyrics: "There are places I'll remember\nAll my life, though some have changed\nSome forever, not for better\nSome have gone and some remain\n\nAll these places had their moments\nWith lovers and friends I still can recall\nSome are dead and some are living\nIn my life I've loved them all",
        video: 'https://www.youtube.com/embed/rDnGRTpy87k'
      },
    ]
  },
  {
    albumId: 4, title: 'Please Please Me', artist: 'The Beatles', year: 1963,
    tracks: [
      {
        id: 46, number: 8, title: 'Love Me Do',
        lyrics: "Love, love me do\nYou know I love you\nI'll always be true\nSo please, love me do\nWhoa, love me do",
        video: 'https://www.youtube.com/embed/starRH1L8sYk'
      },
      {
        id: 52, number: 14, title: 'Twist and Shout',
        lyrics: "Well, shake it up, baby, now (shake it up, baby)\nTwist and shout (twist and shout)\nCome on, come on, come on, come on, baby, now (come on baby)\nCome on and work it on out (work it on out)",
        video: 'https://www.youtube.com/embed/GFUwkbvEECo'
      },
    ]
  },
  {
    albumId: 6, title: "A Hard Day's Night", artist: 'The Beatles', year: 1964,
    tracks: [
      {
        id: 67, number: 1, title: "A Hard Day's Night",
        lyrics: "It's been a hard day's night\nAnd I've been working like a dog\nIt's been a hard day's night\nI should be sleeping like a log\n\nBut when I get home to you\nI find the things that you do\nWill make me feel alright",
        video: 'https://www.youtube.com/embed/A_MjCqQoLLA'
      },
      {
        id: 73, number: 7, title: "Can't Buy Me Love",
        lyrics: "Can't buy me love, love\nCan't buy me love\n\nI'll buy you a diamond ring my friend\nIf it makes you feel alright\nI'll get you anything my friend\nIf it makes you feel alright",
        video: 'https://www.youtube.com/embed/sprr7_gQ-Ls'
      },
    ]
  },
  {
    albumId: 7, title: 'Help!', artist: 'The Beatles', year: 1965,
    tracks: [
      {
        id: 80, number: 1, title: 'Help!',
        lyrics: "Help! I need somebody\nHelp! Not just anybody\nHelp! You know I need someone\nHelp!\n\nWhen I was younger, so much younger than today\nI never needed anybody's help in any way",
        video: 'https://www.youtube.com/embed/2Q_ZzBGPdqE'
      },
      {
        id: 86, number: 7, title: 'Ticket to Ride',
        lyrics: "I think I'm gonna be sad\nI think it's today, yeah\nThe girl that's driving me mad\nIs going away\n\nShe's got a ticket to ride\nShe's got a ticket to ri-hi-hide\nShe's got a ticket to ride\nAnd she don't care",
        video: 'https://www.youtube.com/embed/4KkAFBPpGbQ'
      },
      {
        id: 92, number: 13, title: 'Yesterday',
        lyrics: "Yesterday, all my troubles seemed so far away\nNow it looks as though they're here to stay\nOh, I believe in yesterday\n\nSuddenly, I'm not half the man I used to be\nThere's a shadow hanging over me\nOh, yesterday came suddenly",
        video: 'https://www.youtube.com/embed/NrgmdOz227I'
      },
    ]
  },
  {
    albumId: 8, title: "Sgt. Pepper's Lonely Hearts Club Band", artist: 'The Beatles', year: 1967,
    tracks: [
      {
        id: 95, number: 2, title: 'With a Little Help from My Friends',
        lyrics: "What would you think if I sang out of tune?\nWould you stand up and walk out on me?\nLend me your ears and I'll sing you a song\nAnd I'll try not to sing out of key\n\nOh, I get by with a little help from my friends",
        video: 'https://www.youtube.com/embed/0C58ttB2-Qg'
      },
      {
        id: 96, number: 3, title: 'Lucy in the Sky with Diamonds',
        lyrics: "Picture yourself in a boat on a river\nWith tangerine trees and marmalade skies\nSomebody calls you, you answer quite slowly\nA girl with kaleidoscope eyes",
        video: 'https://www.youtube.com/embed/naoknj1ebqI'
      },
      {
        id: 106, number: 13, title: 'A Day in the Life',
        lyrics: "I read the news today, oh boy\nAbout a lucky man who made the grade\nAnd though the news was rather sad\nWell, I just had to laugh\nI saw the photograph",
        video: 'https://www.youtube.com/embed/usNsCeOV4GM'
      },
    ]
  },
  {
    albumId: 9, title: 'Magical Mystery Tour', artist: 'The Beatles', year: 1967,
    tracks: [
      {
        id: 114, number: 8, title: 'Strawberry Fields Forever',
        lyrics: "Let me take you down\n'Cause I'm going to Strawberry Fields\nNothing is real\nAnd nothing to get hung about\nStrawberry Fields forever",
        video: 'https://www.youtube.com/embed/HtUH9z_Oey8'
      },
      {
        id: 115, number: 9, title: 'Penny Lane',
        lyrics: "In Penny Lane there is a barber showing photographs\nOf every head he's had the pleasure to know\nAnd all the people that come and go\nStop and say hello",
        video: 'https://www.youtube.com/embed/S-rB0pHI9fU'
      },
      {
        id: 117, number: 11, title: 'All You Need Is Love',
        lyrics: "Love, love, love\nLove, love, love\nLove, love, love\n\nThere's nothing you can do that can't be done\nNothing you can sing that can't be sung\nNothing you can say but you can learn how to play the game\nIt's easy",
        video: 'https://www.youtube.com/embed/dsxtImDVMig'
      },
    ]
  },
  {
    albumId: 10, title: 'The Beatles (White Album)', artist: 'The Beatles', year: 1968,
    tracks: [
      {
        id: 118, number: 1, title: 'Back in the U.S.S.R.',
        lyrics: "Flew in from Miami Beach BOAC\nDidn't get to bed last night\nOn the way the paper bag was on my knee\nMan, I had a dreadful flight\n\nI'm back in the U.S.S.R.\nYou don't know how lucky you are, boy\nBack in the U.S.S.R.",
        video: 'https://www.youtube.com/embed/gg-bbSBzMKw'
      },
      {
        id: 128, number: 11, title: 'Blackbird',
        lyrics: "Blackbird singing in the dead of night\nTake these broken wings and learn to fly\nAll your life\nYou were only waiting for this moment to arise",
        video: 'https://www.youtube.com/embed/man9q4GIUoQ'
      },
    ]
  },
  {
    albumId: 12, title: 'Abbey Road', artist: 'The Beatles', year: 1969,
    tracks: [
      {
        id: 161, number: 1, title: 'Come Together',
        lyrics: "Here come old flat top\nHe come grooving up slowly\nHe got joo-joo eyeball\nHe one holy roller\nHe got hair down to his knee\nGot to be a joker\nHe just do what he please\n\nCome together, right now\nOver me",
        video: 'https://www.youtube.com/embed/45cYwDMibGo'
      },
      {
        id: 162, number: 2, title: 'Something',
        lyrics: "Something in the way she moves\nAttracts me like no other lover\nSomething in the way she woos me\nI don't want to leave her now\nYou know I believe and how",
        video: 'https://www.youtube.com/embed/UelDrZ1aFeY'
      },
      {
        id: 167, number: 7, title: 'Here Comes the Sun',
        lyrics: "Here comes the sun (doo-doo-doo-doo)\nHere comes the sun, and I say\nIt's alright\n\nLittle darling, it's been a long cold lonely winter\nLittle darling, it feels like years since it's been here",
        video: 'https://www.youtube.com/embed/KQetemT1sWc'
      },
    ]
  },
  {
    albumId: 13, title: 'Let It Be', artist: 'The Beatles', year: 1970,
    tracks: [
      {
        id: 183, number: 6, title: 'Let It Be',
        lyrics: "When I find myself in times of trouble\nMother Mary comes to me\nSpeaking words of wisdom\nLet it be\n\nAnd in my hour of darkness\nShe is standing right in front of me\nSpeaking words of wisdom\nLet it be",
        video: 'https://www.youtube.com/embed/QDYfEBY9NM4'
      },
      {
        id: 187, number: 10, title: 'The Long and Winding Road',
        lyrics: "The long and winding road\nThat leads to your door\nWill never disappear\nI've seen that road before\nIt always leads me here\nLeads me to your door",
        video: 'https://www.youtube.com/embed/fR4HjTH_fTM'
      },
      {
        id: 189, number: 12, title: 'Get Back',
        lyrics: "Jojo was a man who thought he was a loner\nBut he knew it wouldn't last\nJojo left his home in Tucson, Arizona\nFor some California grass\n\nGet back, get back\nGet back to where you once belonged",
        video: 'https://www.youtube.com/embed/feHUkGOoSMg'
      },
    ]
  },
];

async function seedAlbum(albumData) {
  const { albumId, title, artist, year, tracks } = albumData;
  const res = await fetch(`${BASE}/albums`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ albumId, title, artist, year, tracks }),
  });
  const json = await res.json();
  if (res.ok) {
    console.log(`✓ Updated album ${albumId} (${title}) — ${tracks.length} track(s)`);
  } else {
    console.error(`✗ Failed album ${albumId}: ${JSON.stringify(json)}`);
  }
}

(async () => {
  for (const album of updates) {
    await seedAlbum(album);
  }
  console.log('Done.');
})();
