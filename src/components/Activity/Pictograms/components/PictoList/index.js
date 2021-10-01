import React from 'react';
import Loading from '../../../../Loading';

import PictoItem from '../PictoItem';

import './styles.css';

function getBadgeCount(pictos, loading) {
  if (loading) return 'Cargando...';
  return (pictos && pictos.length) || 0;
}
const PictoList = ({ className, pictos, onItemClick, onItemClickAdd, loading, labelText, placeholderText, addItemVisible }) => (
  <div id='drawer' className={`${className}`}>
    {/* boton para abrir la lista de seleccion manual */}
    <div className='pic-drawer-grip-container'>
      <p className='pic-drawer-label'>{labelText}</p>
      <p className='pic-drawer-item-count'>{getBadgeCount(pictos, loading)}</p>
      <i className='fas fa-chevron-right' style={{ color: 'grey' }}></i>
    </div>
    {/* lista de seleccion manual */}
    <div id='list' className='pic-drawer'>
      {loading && (
        <div className='loading'>
          <Loading />
        </div>
      )}
      {!loading && (!pictos || !pictos.length) && <p className='pic-text-placeholder'>{placeholderText}</p>}
      {!loading && pictos && pictos.map((p) => <PictoItem picto={p} onClick={onItemClick} onClickAdd={onItemClickAdd} addItemVisible={addItemVisible} />)}
    </div>
  </div>
);

export default PictoList;
