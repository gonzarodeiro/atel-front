import React, { useState } from 'react';
import PictoItemControls from '../PictoItemControls';
import noImage from './img_placeholder.jpeg';
import './styles.css';

const PictoItem = ({ className, picto, addItemVisible, removeItemVisible, onClick, onClickAdd, onClickRemove }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);

  function shouldShowText() {
    return !picto || !picto.sources || !picto.sources.length || !picto.sources[0] === 'not-found' || error;
  }

  function handleClickLeft() {
    const lastIndex = (picto && picto.sources && picto.sources.length - 1) || 0;
    setCurrentIndex((index) => (index > 0 ? index - 1 : lastIndex));
  }

  function handleClickRigth() {
    const lastIndex = (picto && picto.sources && picto.sources.length - 1) || 0;
    setCurrentIndex((index) => (index < lastIndex ? index + 1 : 0));
  }

  function handleItemClick(selected) {
    const source = selected.sources[currentIndex] || '';
    const selectedPicto = {
      word: selected.word,
      sources: [source]
    };
    if (onClick) {
      onClick(selectedPicto);
    }
  }

  function handleClickAdd(selected) {
    const source = selected.sources[currentIndex] || '';
    const selectedPicto = {
      word: selected.word,
      sources: [source]
    };
    if (onClickAdd) {
      onClickAdd(selectedPicto);
    }
  }

  function handleClickRemove(selected) {
    const source = selected.sources[currentIndex] || '';
    const selectedPicto = {
      word: selected.word,
      sources: [source]
    };
    if (onClickRemove) {
      onClickRemove(selectedPicto);
    }
  }

  function shouldShowArrowControls() {
    return picto && picto.sources && picto.sources.length > 1;
  }

  function shouldShowAddControls() {
    return picto && picto.sources && picto.sources.length > 0 && addItemVisible;
  }

  function shouldShowRemoveControls() {
    return removeItemVisible;
  }

  return (
    <div className={`pic-picto-item-container ${className}`}>
      <PictoItemControls arrowsVisible={shouldShowArrowControls()} plusVisible={shouldShowAddControls()} removeVisible={shouldShowRemoveControls()} onClickLeft={handleClickLeft} onClickRight={handleClickRigth} onClickAdd={() => handleClickAdd(picto)} onClickRemove={() => handleClickRemove(picto)} />
      <div className='pic-picto-item' onClick={() => handleItemClick(picto)}>
        {shouldShowText() && (
          <div className='pic-picto-fallback-text'>
            <p className='pic-picto-fallback-p'>{picto.word || '?'}</p>
          </div>
        )}
        {!shouldShowText() && <img className='pic-picto-image' src={error ? noImage : picto.sources && picto.sources[currentIndex]} alt='pictograma' onError={() => setError(true)} />}
      </div>
      {picto && picto.word && <p className='pic-picto-item-label'>{picto.word}</p>}
    </div>
  );
};

export default PictoItem;
