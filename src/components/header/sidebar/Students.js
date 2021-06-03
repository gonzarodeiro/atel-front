import React from 'react';
import { useHistory } from 'react-router-dom';

const Students = ({ sidebar, showItemMenu, redirectPage }) => {
  let history = useHistory();

  return (
    <div className={'collapsible-sidebar ' + (sidebar ? 'open' : null)}>
      <div className='menu-item' onClick={() => showItemMenu('home', 'sessions')}>
        <i className='fas fa-arrow-left' style={{ fontSize: '15px' }}></i>
        <span className='ml-2 sidebar-item'>Alumnos</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/new-student' ? 'active' : '')} onClick={() => redirectPage('new-student')}>
        <span className='sidebar-item'>Crear nuevo alumno</span>
      </div>
      <div className={'menu-item ' + (history.location.pathname === '/students' ? 'active' : '')} onClick={() => redirectPage('students')}>
        <span className='sidebar-item'>Listado de alumnos</span>
      </div>
    </div>
  );
};

export default Students;
