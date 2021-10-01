import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import './styles.css';

const PictoItemControls = ({ className, arrowsVisible, plusVisible, onClickLeft, onClickRight, onClickAdd }) => (
  <div className={`pic-picto-item-controls ${className}`}>
    {arrowsVisible && <i className='fas fa-chevron-left pic-picto-btn-up' onClick={onClickLeft} />}
    {plusVisible && (
      <OverlayTrigger trigger='hover' overlay={<Tooltip id='tooltip-disabled'>Agregar a plantilla del alumno</Tooltip>} placement='left'>
        <div>
          <i className='fas fa-plus pic-picto-btn-up' onClick={onClickAdd} />
        </div>
      </OverlayTrigger>
    )}
    {arrowsVisible && <i className='fas fa-chevron-right pic-picto-btn-down' onClick={onClickRight} />}
  </div>
);

export default PictoItemControls;
