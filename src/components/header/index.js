import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logout from '../../utils/commons/logout';
import Home from './sidebar/Home';
import Sessions from './sidebar/Sessions';
import Schedule from './sidebar/Schedule';
import Students from './sidebar/Students';

const Header = () => {
  const [values, setValues] = useState({ isOpen: false });
  const [menu, setMenu] = useState({ home: true, sessions: false, students: false, schedule: false });
  const [sidebar, setSidebar] = useState(false);
  const [open, setOpen] = useState(true);
  let history = useHistory();

  window.addEventListener('wheel', function (event) {
    if (sidebar && !values.isOpen && event.deltaY > 0) closeSidebar();
  });

  function toggleCollapse() {
    setValues({ isOpen: !values.isOpen });
  }

  window.addEventListener('wheel', function (event) {
    if (sidebar && !values.isOpen && event.deltaY > 0) closeSidebar();
  });

  const openSidebar = () => {
    setSidebar(true);
    setOpen(false);
  };

  function closeSidebar() {
    setSidebar(false);
    setOpen(true);
  }

  function showItemMenu(modalToShow, modalToHide) {
    setMenu({ [modalToHide]: false, [modalToShow]: true });
  }

  function redirectPage(path) {
    history.push({ pathname: path });
    closeSidebar();
  }

  function goToHome() {
    history.push(`/home`);
  }

  return (
    <nav data-test='navbar' className={'navbar-light navbar navbar-expand-md w-100 shadow-sm ' + (values.isOpen ? 'null' : 'header-height')} role='navigation' style={{ background: 'rgb(29 37 45 / 91%)' }}>
      <li onClick={() => (open ? openSidebar() : closeSidebar())} className={open ? 'white-text menu' : 'menu-white'}>
        <i className={open ? 'fas fa-bars mr-2 mt-1' : 'fas fa-times mr-2 mt-1'}></i>Menu
      </li>
      {menu.home && <Home sidebar={sidebar} showItemMenu={showItemMenu} redirectPage={redirectPage} />}
      {menu.sessions && <Sessions sidebar={sidebar} showItemMenu={showItemMenu} redirectPage={redirectPage} closeSidebar={closeSidebar} />}
      {menu.schedule && <Schedule sidebar={sidebar} showItemMenu={showItemMenu} redirectPage={redirectPage} closeSidebar={closeSidebar} />}
      {menu.students && <Students sidebar={sidebar} showItemMenu={showItemMenu} redirectPage={redirectPage} closeSidebar={closeSidebar} />}
      <div onClick={closeSidebar} className={'black-cast ' + (sidebar ? 'open' : null)}></div>
      <button onClick={toggleCollapse} data-test='navbar-toggler' type='button' className='navbar-toggler'>
        <i className='fas fa-user' style={{ color: 'white', marginBottom: '2px' }}></i>
      </button>
      <div data-test='collapse' className={'collapse navbar-collapse ' + (values.isOpen ? 'show' : 'null')}>
        <ul data-test='navbar-nav' className='navbar-nav mr-auto'>
          <div onClick={goToHome} style={{ marginTop: '3px', textAlign: 'center', cursor: 'pointer', color: 'white', marginLeft: '27px', fontWeight: '600' }}>
            <span className='brand' style={{ marginRight: '16px' }}>
              ATEL
            </span>
            <span className='divider' style={{ marginRight: '17px' }}></span>
            Asistente terapéutico en línea
          </div>
        </ul>
        <ul data-test='navbar-nav' className='navbar-nav ml-auto'>
          <a href='#/user' className='white-text headerRight'>
            <i className='far fa-user-circle mr-1' style={{ fontSize: '15px' }}></i>
            {sessionStorage.getItem('name')}
          </a>
          <li onClick={logout} className='white-text headerRight mr-1'>
            <i className='fas fa-power-off mr-2 ml-1'></i>Salir
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
