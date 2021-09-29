import React from 'react';
import logout from '../../utils/commons/logout';

const Footer = ({ redirectPage }) => {
  return (
    <div className='sidebar-footer text-center'>
      <i className='fas fa-user-cog' title='Datos del profesional' style={{ fontSize: '20px', marginRight: '30px', marginTop: '6px', marginBottom: '13px', cursor: 'pointer' }} onClick={() => redirectPage('user')}></i>
      <i className='fas fa-power-off' title='Cerrar sesión' style={{ fontSize: '20px', cursor: 'pointer', marginLeft: '30px' }} onClick={logout}></i>
    </div>
  );
};

export default Footer;
