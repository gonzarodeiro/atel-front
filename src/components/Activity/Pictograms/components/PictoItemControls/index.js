import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import './styles.css';

const PictoItemControls = ({ className, arrowsVisible, plusVisible, removeVisible, onClickLeft, onClickRight, onClickAdd, onClickRemove }) => {
  return (
    <div className={`pic-picto-item-controls ${!arrowsVisible && 'pic-controls-zero-height '} ${className}`}>
      {arrowsVisible && <i className='fas fa-chevron-left pic-picto-btn-up' onClick={onClickLeft} />}
      {plusVisible && (
        <div>
          <OverlayTrigger trigger='hover' overlay={<Tooltip id='tooltip-disabled'>Agregar a plantilla del alumno</Tooltip>} placement='left'>
            <i className='fas fa-plus-circle pic-picto-btn-up pic-picto-btn-corner color-add' onClick={onClickAdd} />
          </OverlayTrigger>
        </div>
      )}
      {removeVisible && (
        <div>
          <OverlayTrigger trigger='hover' overlay={<Tooltip id='tooltip-disabled'>Eliminar de la plantilla</Tooltip>} placement='auto'>
            <i className='fas fa-minus-circle pic-picto-btn-up pic-picto-btn-corner color-remove' onClick={onClickRemove} />
          </OverlayTrigger>
        </div>
      )}
      {arrowsVisible && <i className='fas fa-chevron-right pic-picto-btn-down' onClick={onClickRight} />}
    </div>
  );
};

export default PictoItemControls;
