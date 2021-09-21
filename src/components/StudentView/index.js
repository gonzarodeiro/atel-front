import React, { useState } from 'react';
import { clientEvents, sendMessage } from '../../utils/socketManager';
import p1 from './therapist.jpeg';
import p2 from './zoom.jpeg';
import p3 from './class.png';
const items = [p1, p2, p3];

const StudentView = () => {
  const [showList, setShowList] = useState(false);

  const handleItemClick = (selected) => {
    console.log(selected);
    sendMessage(clientEvents.jitsiLayout, selected);
    sendMessage(clientEvents.zoomLayout, selected);
    sendMessage(clientEvents.defaultLayout, selected);
  };

  const handleBlur = (e) => {
    setShowList(false);
  };

  const handleToggleList = () => setShowList(!showList);

  return (
    <>
      <div className='clb-container' tabIndex='1' onBlur={handleBlur} onClick={handleToggleList} title='Modificar vista del alumno'>
        {showList && items && items.length && (
          <div className='clb-list'>
            {items.map((image, index) => (
              <img key={`item-${index}`} className='clb-img' src={image} onClick={() => handleItemClick(image)} alt='miniatura' />
            ))}
          </div>
        )}
        <div className='clb-desktop-btn' onClick={handleToggleList}>
          <i className='fas fa-desktop' style={{ fontSize: '28px', color: 'white' }} />
        </div>
      </div>
    </>
  );
};

export default StudentView;
