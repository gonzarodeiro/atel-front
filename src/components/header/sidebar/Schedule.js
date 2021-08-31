import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer';

const Schedule = ({ sidebar, showItemMenu, redirectPage }) => {
  let history = useHistory();

  return (
    <div className={'collapsible-sidebar ' + (sidebar ? 'open' : null)}>
      <div className='menu-item' onClick={() => showItemMenu('home', 'schedule')}>
        <i className='fas fa-arrow-left' style={{ fontSize: '15px' }}></i>
        <span className='ml-2 sidebar-item'>Agenda</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/pending-session' ? 'active' : '')} onClick={() => redirectPage('pending-session')}>
        <span className='sidebar-item'>Sesiones pendientes</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/historical-session' ? 'active' : '')} onClick={() => redirectPage('historical-session')}>
        <span className='sidebar-item'>Histórico de sesiones</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/share-session' ? 'active' : '')} onClick={() => redirectPage('share-session')}>
        <span className='sidebar-item'>Compartir sesiones</span>
      </div>
      <Footer redirectPage={redirectPage} />
    </div>
  );
};

export default Schedule;
