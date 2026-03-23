import React from 'react';

const Card = (props) => {
  const handleButtonClick = (event, uri) => {
    console.log('ID clicked is ' + props.albumId);
    props.onClick(props.albumId, uri);
  };


  return (
    <div className='card' style={{ width: '18rem' }}>
      <img src={props.imgURL} className='card-img-top' alt='Test Name' />
      <div className='card-body'>
        <h5 className='card-title'>{props.albumTitle}</h5>
        <p className='card-text'>{props.albumDescription}</p>
        <button
          onClick={() => handleButtonClick(props.albumId, '/show/')}
          className='btn btn-primary'
        >
          {props.buttonText}
        </button>
        <button
          onClick={() => handleButtonClick(props.albumId, '/edit/')}
          className='btn btn-secondary'
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;
