import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer';

const Sessions = ({ sidebar, showItemMenu, redirectPage }) => {
  let history = useHistory();

  return (
    <div className={'collapsible-sidebar ' + (sidebar ? 'open' : null)}>
      <div className='menu-item' onClick={() => showItemMenu('home', 'sessions')}>
        <i className='fas fa-arrow-left' style={{ fontSize: '15px' }}></i>
        <span className='ml-2 sidebar-item'>Sesiones</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/meeting-instantly' ? 'active' : '')} onClick={() => redirectPage('meeting-instantly')}>
        <span className='sidebar-item'>Iniciar una reunión al instante</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/meeting-for-later' ? 'active' : '')} onClick={() => redirectPage('meeting-for-later')}>
        <span className='sidebar-item'>Programar una nueva sesión</span>
      </div>
      <Footer redirectPage={redirectPage} />
    </div>
  );
};

export default Sessions;
