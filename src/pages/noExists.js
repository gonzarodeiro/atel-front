import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';

const NoExist = () => {
  let history = useHistory();
  const [url, setUrl] = useState({ location: '' });

  useEffect(() => {
    setUrl({ location: history.location.pathname });
  }, [history.location.pathname]);

  return (
    <div className='faster d-flex flex-column justify-content-center align-items-center vh-100 overflow-hidden'>
      <div className='container text-center'>
        <p className='font-weight-bold' style={{ fontSize: '5em', color: '#1565c0' }}>
          Error!
        </p>
        <p className='lead pb-4'>
          La página
          <i className='font-weight-bold' style={{ color: '#1565c0', marginLeft: '6px', marginRight: '6px' }}>
            {url.location}
          </i>
          no existe, cambió de nombre o esta temporalmente inhabilitada
        </p>
        <Link to='/'>
          <MDBBtn size='lg' className='blue darken-3 animated fadeInUp shadow-none btnOption'>
            Ir a la página principal
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
};

export default NoExist;
