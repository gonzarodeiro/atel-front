import React from 'react';
import './index.css';

const VIDEO_WIDTH = 460;
const VIDEO_HEIGHT = 360;
const RATIO = VIDEO_HEIGHT / VIDEO_WIDTH;
const CUSTOM_SIZE = 500;
const ActivityWizard = ({ src, steps, title, message, closeButtonText, onCloseClick }) => {
  return (
    <div className='w-container' onClick={onCloseClick}>
      <div className='w-dialog'>
        {title && <div className='w-title'>{title}</div>}
        {src && (
          <div className='w-video-crop'>
            <video className='w-video' controls={false} autoPlay={true} width={CUSTOM_SIZE} height={CUSTOM_SIZE * RATIO} loop={true}>
              <source src={src} type='video/mp4' />
            </video>
          </div>
        )}
        {message && <div className='w-message'>{message}</div>}
        {steps && (
          <div className='w-step-container' onClick={onCloseClick}>
            {steps.map((step, i) => (
              <div className='w-step-item' key={`${step}_${i}`}>
                <div className='w-step-number'>{`${i + 1}`}</div>
                <div className='w-step-text'>{step}</div>
              </div>
            ))}
          </div>
        )}
        <button className='w-btn w-btn-close' onClick={onCloseClick}>
          {closeButtonText ? closeButtonText : 'CERRAR'}
        </button>
      </div>
    </div>
  );
};

export default ActivityWizard;
