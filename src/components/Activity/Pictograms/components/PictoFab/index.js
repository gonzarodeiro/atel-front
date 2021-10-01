import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './styles.css';

const PictoFab = ({ style, onClick }) => {
  return (
    <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Pictogramas</Tooltip>} placement='left'>
      <div className='pic-fab' type='button' style={style} onClick={onClick}>
        <i className='fas fa-smile' style={{ fontSize: '28px', color: 'white' }} />
      </div>
    </OverlayTrigger>
  );
};

export default PictoFab;
