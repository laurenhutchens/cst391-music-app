import React from 'react';
import TrackTitle from './TrackTitle';

const TracksList = ({ tracks, onTrackSelect }) => {
  if (!tracks || tracks.length === 0) {
    return <ul className='list-group'><li className='list-group-item'>No tracks available.</li></ul>;
  }

  return (
    <ul className='list-group'>
      {tracks.map((track) => (
        <TrackTitle key={track.id} track={track} onClick={onTrackSelect} />
      ))}
    </ul>
  );
};

export default TracksList;
