import React from 'react';

const TrackLyrics = ({ track }) => {
  if (!track) {
    return (
      <div className='card mb-3'>
        <div className='card-body'>
          <p className='card-text text-muted'>Select a track to view lyrics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <h6 className='card-subtitle mb-2 text-muted'>Lyrics: {track.title}</h6>
        <p className='card-text' style={{ whiteSpace: 'pre-wrap' }}>
          {track.lyrics || 'No lyrics available for this track.'}
        </p>
      </div>
    </div>
  );
};

export default TrackLyrics;
