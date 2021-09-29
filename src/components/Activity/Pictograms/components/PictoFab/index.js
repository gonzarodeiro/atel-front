import React from 'react';
import './styles.css';

const PictoFab = ({ onClick }) => {
  return (
    <div className='pic-fab' onClick={onClick}>
      <i className='fas fa-image' style={{ fontSize: '28px', color: 'white' }} />
    </div>
  );
};

export default PictoFab;
