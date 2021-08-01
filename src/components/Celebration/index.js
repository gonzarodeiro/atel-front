import React, { useEffect, useState } from 'react';
import { clientEvents, registerEvent, sendMessage } from '../../utils/socketManager';

import p1 from './personaje1.gif';
import p2 from './personaje2.gif';
import p3 from './personaje3.gif';

import './index.css';

const items = [p1, p2, p3];

export const celebrationType = {
  SENDER: 0,
  RECEIVER: 1
};

const Celebration = ({ type }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [{ image, showImage }, setShowImage] = useState({ image: null, visible: false });

  useEffect(() => {
    if (type === celebrationType.RECEIVER) {
      registerEvent((selected) => {
        console.log('received');
        setShowImage({
          image: selected,
          showImage: true
        });
      }, clientEvents.showCelebration);
      registerEvent(() => {
        console.log('received');
        setShowImage({
          image: '',
          showImage: false
        });
      }, clientEvents.closeCelebration);
    }
  });

  const handleItemClick = (selected) => {
    if (type === celebrationType.SENDER) {
      setShowImage({
        image: selected,
        showImage: true
      });
      sendMessage(clientEvents.showCelebration, selected);
      setShowMenu(false);
    }
  };

  const handleImageClick = (selected) => {
    if (type === celebrationType.SENDER) {
      setShowImage({
        image: selected,
        showImage: false
      });
      sendMessage(clientEvents.closeCelebration);
    }
  };

  return (
    <>
      {type === celebrationType.SENDER && (
        <div className='clb-container'>
          {showMenu && items && items.length && (
            <div className='clb-menu'>
              {items.map((image, index) => (
                <img key={`item-${index}`} className='clb-img' src={image} onClick={() => handleItemClick(image)} alt='miniatura' />
              ))}
            </div>
          )}
          <div className='clb-btn' onClick={() => setShowMenu(!showMenu)}>
            <i className='fas fa-heart' style={{ fontSize: '28px', color: 'white' }} />
          </div>
        </div>
      )}
      {showImage && <img src={image} className='clb-selected-img' alt='imagen' onClick={() => handleImageClick(image)} />}
    </>
  );
};

export default Celebration;
