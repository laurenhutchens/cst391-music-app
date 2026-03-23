import React, { useState } from 'react';
import TracksList from './TracksList';
import TrackLyrics from './TrackLyrics';
import TrackVideo from './TrackVideo';

const OneAlbum = (props) => {
  const [selectedTrack, setSelectedTrack] = useState(null);

  if (!props.album) {
    return <div className='container'><p>No album selected.</p></div>;
  }

  return (
    <div className='container'>
      <h2>Album Details for {props.album.title}</h2>
      <div className='row'>
        <div className='col col-sm-3'>
          <div className='card'>
            <img
              src={props.album.image}
              className='card-img-top'
              alt={props.album.title}
            />
            <div className='card-body'>
              <h5 className='card-title'>{props.album.title}</h5>
              <p className='card-text'>{props.album.description}</p>
              <TracksList
                tracks={props.album.tracks}
                onTrackSelect={setSelectedTrack}
              />
              <a href='/#' className='btn btn-primary mt-2'>
                Edit
              </a>
            </div>
          </div>
        </div>
        <div className='col col-sm-9'>
          <TrackLyrics track={selectedTrack} />
          <TrackVideo track={selectedTrack} />
        </div>
      </div>
    </div>
  );
};

export default OneAlbum;
