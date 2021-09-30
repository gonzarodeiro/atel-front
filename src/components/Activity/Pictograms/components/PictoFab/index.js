import React from 'react';
import './styles.css';

const PictoFab = ({ style, onClick }) => {
  return (
    <div className='pic-fab' style={style} onClick={onClick}>
      <i className='fas fa-smile' style={{ fontSize: '28px', color: 'white' }} />
    </div>
  );
};

export default PictoFab;
