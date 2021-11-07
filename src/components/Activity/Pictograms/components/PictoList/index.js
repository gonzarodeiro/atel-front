import React from 'react';
import PictoBasicList from '../PictoBasicList';

import './styles.css';

function getBadgeCount(pictos, loading) {
  if (loading) return 'Cargando...';
  return (pictos && pictos.length) || 0;
}
const PictoList = ({ className, pictos, onItemClick, onItemClickAdd, onItemClickRemove, loading, labelText, placeholderText, addItemVisible, removeItemVisible }) => (
  <div className={`pic-drawer-container ${className}`}>
    {/* boton para abrir la lista de seleccion manual */}
    <div className='pic-drawer-grip-container'>
      <p className='pic-drawer-label'>{labelText}</p>
      <p className='pic-drawer-item-count'>{getBadgeCount(pictos, loading)}</p>
      <i className='fas fa-chevron-right' style={{ color: 'grey' }}></i>
    </div>
    {/* lista de seleccion manual */}
    <PictoBasicList className='pic-basic-list fix-height' pictos={pictos} onItemClick={onItemClick} onItemClickAdd={onItemClickAdd} onItemClickRemove={onItemClickRemove} addItemVisible={addItemVisible} removeItemVisible={removeItemVisible} placeholderText={placeholderText} loading={loading} />
  </div>
);

export default PictoList;
