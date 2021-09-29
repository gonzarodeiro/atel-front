import React, { useState } from 'react';

import noImage from './img_placeholder.jpeg';

import './styles.css';

const StripeItem = ({ className, picto }) => {
  const [error, setError] = useState(false);

  function shouldShowText() {
    return !picto || !picto.sources || !picto.sources.length || !picto.sources[0] === 'not-found' || error;
  }

  return (
    <div className={`pic-stripe-item ${className}`}>
      {shouldShowText() && (
        <div className='pic-stripe-fallback-text'>
          <p className='pic-stripe-fallback-p'>{picto.word || '?'}</p>
        </div>
      )}
      {!shouldShowText() && <img className='pic-stripe-item-image' src={error ? noImage : picto.sources[0]} alt='pictograma' onError={() => setError(true)} />}
    </div>
  );
};

export default StripeItem;
