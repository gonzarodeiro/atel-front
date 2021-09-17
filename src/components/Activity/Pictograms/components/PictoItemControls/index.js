import React from 'react';

import './styles.css';

const PictoItemControls = ({ className, visible, onClickLeft, onClickRight }) => (
  <div className={`pic-picto-item-controls ${className}`}>
    {visible && <i className='fas fa-chevron-left pic-picto-btn-up' onClick={onClickLeft} />}
    {visible && <i className='fas fa-chevron-right pic-picto-btn-down' onClick={onClickRight} />}
  </div>
);

export default PictoItemControls;
