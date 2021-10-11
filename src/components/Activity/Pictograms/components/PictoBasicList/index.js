import React from 'react';
import Loading from '../../../../Loading';

import PictoItem from '../PictoItem';

import './styles.css';

const PictoBasicList = ({ id, className, pictos, onItemClick, onItemClickAdd, onItemClickRemove, loading, placeholderText, addItemVisible, removeItemVisible }) => (
  <div id={id} className={`pic-basic-list-container ${className}`}>
    {loading && (
      <div className='loading'>
        <Loading />
      </div>
    )}
    {!loading && (!pictos || !pictos.length) && <p className='pic-text-placeholder'>{placeholderText}</p>}
    {!loading && pictos && pictos.map((p) => <PictoItem picto={p} onClick={onItemClick} onClickAdd={onItemClickAdd} onClickRemove={onItemClickRemove} addItemVisible={addItemVisible} removeItemVisible={removeItemVisible} />)}
  </div>
);

export default PictoBasicList;
