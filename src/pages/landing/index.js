import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
const Landing = () => {
  return (
    <div className='faster d-flex flex-column justify-content-center align-items-center vh-100 overflow-hidden'>
      <div className='container text-center'>
        <p className='font-weight-bold' style={{ fontSize: '45px', color: '#1565c0' }}>
          Landing page, a desarrollar!
        </p>
        <Link to='/login'>
          <MDBBtn size='lg' className='blue darken-3 animated fadeInUp shadow-none btnOption'>
            Iniciar sesión
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
