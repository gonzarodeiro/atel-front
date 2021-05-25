import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import MainMenu from './sidebar/mainMenu';

const Header = () => {
  const [values, setValues] = useState({ isOpen: false });
  const [menu, setMenu] = useState({ home: true });
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

  function logout() {
    swal(
      <div>
        <p className='h4 mt-4 mb-3'>¿Querés salir de la sesión?</p>
      </div>,
      {
        icon: 'error',
        buttons: {
          cancel: 'Cancelar',
          catch: {
            text: 'Salir',
            value: 'logout'
          }
        }
      }
    ).then((value) => {
      if (value === 'logout') {
        sessionStorage.clear();
        history.push(`/login`);
      }
    });
  }

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
    <nav data-test='navbar' className={'navbar-light navbar navbar-expand-md w-100 shadow-sm ' + (values.isOpen ? 'null' : 'header-height')} role='navigation' style={{ background: '#dd4b39' }}>
      <li onClick={() => (open ? openSidebar() : closeSidebar())} className={open ? 'white-text menu' : 'menu-white'}>
        <i className={open ? 'fas fa-bars mr-2 mt-1' : 'fas fa-times mr-2 mt-1'}></i>Menu
      </li>
      {menu.home && <MainMenu sidebar={sidebar} showItemMenu={showItemMenu} redirectPage={redirectPage} />}
      <div onClick={closeSidebar} className={'black-cast ' + (sidebar ? 'open' : null)}></div>
      <button onClick={toggleCollapse} data-test='navbar-toggler' type='button' className='navbar-toggler'>
        <i className='fas fa-user' style={{ color: 'white', marginBottom: '2px' }}></i>
      </button>
      <div data-test='collapse' className={'collapse navbar-collapse ' + (values.isOpen ? 'show' : 'null')}>
        <ul data-test='navbar-nav' className='navbar-nav mr-auto'>
          <div onClick={goToHome} style={{ marginTop: '8px', textAlign: 'center', cursor: 'pointer' }}>
            <span className='divider'></span>
            <span className='brand'> ATEL</span>
          </div>
        </ul>
        <ul data-test='navbar-nav' className='navbar-nav ml-auto'>
          <a href='#/home' className='white-text headerRight'>
            <i className='far fa-user-circle mr-1' style={{ fontSize: '15px' }}></i>
            {sessionStorage.getItem('name')}
          </a>
          <li onClick={logout} className='white-text headerRight mr-1'>
            <i className='fas fa-sign-out-alt mr-1 ml-1'></i>Salir
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
