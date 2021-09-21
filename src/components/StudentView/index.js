import React, { useState } from 'react';
import { clientEvents, sendMessage } from '../../utils/socketManager';
import initial from './images/default.jpeg';
import therapist from './images/therapist.jpeg';
import zoom from './images/zoom.jpeg';
const items = [initial, therapist, zoom];

const StudentView = () => {
  const [showList, setShowList] = useState(false);

  const handleItemClick = (selected) => {
    if (selected === 0) sendMessage(clientEvents.defaultLayout, selected);
    if (selected === 1) sendMessage(clientEvents.jitsiLayout, selected);
    if (selected === 2) sendMessage(clientEvents.zoomLayout, selected);
  };

  const handleBlur = () => setShowList(false);

  const handleToggleList = () => setShowList(!showList);

  return (
    <>
      <div className='clb-container' onBlur={handleBlur} tabIndex='1' onClick={handleToggleList}>
        {showList && items && items.length && (
          <div className='clb-desktop-list'>
            {items.map((image, index) => (
              <img key={`item-${index}`} className='clb-desktop-img' src={image} onClick={() => handleItemClick(index)} alt='miniatura' style={{ cursor: 'pointer' }} />
            ))}
          </div>
        )}
        <div className='clb-desktop-btn' onClick={handleToggleList}>
          <i className='fas fa-desktop' style={{ fontSize: '28px', color: 'white' }} title='Modificar vista del alumno' />
        </div>
      </div>
    </>
  );
};

export default StudentView;
