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
const MAX_TIME = 4000;
let timer;

const Celebration = ({ type }) => {
  const [showList, setShowList] = useState(false);
  const [{ image, showImage }, setShowImage] = useState({ image: null, visible: false });

  useEffect(() => {
    if (type === celebrationType.RECEIVER) {
      registerEvent((selected) => {
        setShowImage({
          image: selected,
          showImage: true
        });
      }, clientEvents.showCelebration);
      registerEvent(() => {
        setShowImage({
          image: '',
          showImage: false
        });
      }, clientEvents.closeCelebration);
    }

    // control the animation time
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setShowImage({
        image: '',
        showImage: false
      });
    }, MAX_TIME);
  }, [showImage, image]);

  const handleItemClick = (selected) => {
    if (type === celebrationType.SENDER) {
      setShowImage({
        image: selected,
        showImage: true
      });
      sendMessage(clientEvents.showCelebration, selected);
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

  // hide list when div loses focus
  const handleBlur = (e) => {
    setShowList(false);
  };

  // hide list when click on it
  const handleToggleList = () => setShowList(!showList);

  return (
    <>
      {type === celebrationType.SENDER && (
        <div className='clb-container' tabIndex='1' onBlur={handleBlur} onClick={handleToggleList}>
          {showList && items && items.length && (
            <div className='clb-list'>
              {items.map((image, index) => (
                <img key={`item-${index}`} className='clb-img' src={image} onClick={() => handleItemClick(image)} alt='miniatura' />
              ))}
            </div>
          )}
          <div className='clb-btn' onClick={handleToggleList}>
            <i className='fas fa-heart' style={{ fontSize: '28px', color: 'white' }} />
          </div>
        </div>
      )}
      {showImage && <img src={image} className='clb-selected-img' alt='imagen' onClick={() => handleImageClick(image)} />}
    </>
  );
};

export default Celebration;
