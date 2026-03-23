import React from 'react';

const TrackTitle = ({ track, onClick }) => {
  return (
    <li
      className='list-group-item list-group-item-action'
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(track)}
    >
      {track.number}. {track.title}
    </li>
  );
};

export default TrackTitle;
