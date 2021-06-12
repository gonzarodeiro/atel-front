import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer';

const MainMenu = ({ sidebar, redirectPage, showItemMenu }) => {
  let history = useHistory();
  return (
    <div className={'collapsible-sidebar ' + (sidebar ? 'open' : null)}>
      <div className={'menu-item ' + (history.location.pathname === '/home' ? 'active' : '')} onClick={() => redirectPage('home')}>
        <i className='fas fa-home' style={{ fontSize: '19px', marginRight: '17px' }}></i>
        <span style={{ fontWeight: '600', marginTop: '6px' }}>Inicio</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/sessions' ? 'active' : '')} onClick={() => showItemMenu('sessions', 'home')}>
        <i className='fas fa-video' style={{ fontSize: '18px', marginRight: '18px' }}></i>
        <span style={{ fontWeight: '600', marginTop: '2px' }}>Sesiones</span>
      </div>
      {/* <div className={'menu-item ' + (history.location.pathname === '/students' ? 'active' : '')} onClick={() => showItemMenu('students', 'home')}>
        <i className='fas fa-user-friends' style={{ fontSize: '20px', marginRight: '16px' }}></i>
        <span style={{ fontWeight: '600', marginTop: '3px' }}>Alumnos</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/schedule' ? 'active' : '')} onClick={() => redirectPage('schedule')}>
        <i className='fas fa-list' style={{ fontSize: '20px', marginRight: '16px' }}></i>
        <span style={{ fontWeight: '600', marginTop: '3px' }}>Agenda</span>
      </div> */}
      <Footer redirectPage={redirectPage} />
    </div>
  );
};

export default MainMenu;
