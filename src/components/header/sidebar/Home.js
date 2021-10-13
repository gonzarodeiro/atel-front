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
      <div className={'menu-item ' + (history.location.pathname === '/students' ? 'active' : '')} onClick={() => showItemMenu('students', 'home')}>
        <i className='fas fa-user-friends' style={{ fontSize: '20px', marginRight: '16px' }}></i>
        <span style={{ fontWeight: '600', marginTop: '3px' }}>Alumnos</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/schedule' ? 'active' : '')} onClick={() => showItemMenu('schedule', 'home')}>
        <i className='far fa-calendar-alt' style={{ fontSize: '20px', marginRight: '23px' }}></i>
        <span style={{ fontWeight: '600' }}>Agenda</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/pictograms' ? 'active' : '')} onClick={() => redirectPage('pictograms')}>
        <i className='far fa-smile-beam' style={{ fontSize: '20px', marginRight: '19px' }}></i>
        <span style={{ fontWeight: '600' }}>Pictogramas</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/share-session' ? 'active' : '')} onClick={() => redirectPage('share-session')}>
        <i className='fas fa-share-alt' style={{ fontSize: '20px', marginRight: '20px' }}></i>
        <span style={{ fontWeight: '600' }}>Compartir</span>
      </div>
      <Footer redirectPage={redirectPage} />
    </div>
  );
};

export default MainMenu;
