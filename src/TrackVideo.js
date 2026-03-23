import React from 'react';

const TrackVideo = ({ track }) => {
  if (!track) {
    return (
      <div className='card'>
        <div className='card-body'>
          <p className='card-text text-muted'>Select a track to view its video.</p>
        </div>
      </div>
    );
  }

  if (!track.video) {
    return (
      <div className='card'>
        <div className='card-body'>
          <p className='card-text text-muted'>No video available for &quot;{track.title}&quot;.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h6 className='card-subtitle mb-2 text-muted'>Video: {track.title}</h6>
        <div className='ratio ratio-16x9'>
          <iframe
            src={track.video}
            title={track.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TrackVideo;
