import React from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';

const Login = ({ handleChange, user, handleLogin, setSteps, errorsLogin, setErrorsLogin }) => {
  function registration() {
    setSteps({ login: false, registration: true });
    setErrorsLogin({ show: false, message: '' });
  }

  return (
    <React.Fragment>
      <form action=''>
        <div className='tittle'>¡Hola! Bienvenido</div>
        <div className='d-block mt-3' style={{ fontSize: '16px !important' }}>
          <MDBInput label='Usuario' id='name' onChange={handleChange} value={user.name} group type='text' validate success='right' style={{ marginBottom: '25px' }} />
          <MDBInput label='Contraseña' id='password' onChange={handleChange} value={user.password} group type='password' validate='container' className='mb-4' />
        </div>
        <div className='text-center mt-3 black-text'>
          <MDBBtn onClick={handleLogin} rounded style={{ fontSize: '14px', padding: '11px 12px', marginTop: '37px', marginBottom: '35px' }} className={'btn-block rounded shadow-none blue darken-3 text-white'}>
            Iniciar Sesión
            <div className='position-absolute' style={{ right: 13, top: 17 }}></div>
          </MDBBtn>
          <hr className='hr-light mb-3 mt-4' />
          <div className='text-center d-flex justify-content-center white-label' style={{ color: 'rgb(152, 152, 152)', fontSize: '15px', fontWeight: '500' }}>
            ¿No tienes una cuenta?
            <b className='ml-2' onClick={registration} style={{ cursor: 'pointer', color: '#1750b8de' }}>
              Registrate
            </b>
          </div>
        </div>
        {errorsLogin.show && (
          <div className='w-100 animated fadeInUp faster shadow' style={{ left: 0, bottom: -40, marginTop: '45px' }}>
            <span className='d-block small text-white text-center py-3 mx-auto rounded w-100' style={{ backgroundColor: '#e53935' }}>
              {errorsLogin.message}
            </span>
          </div>
        )}
      </form>
    </React.Fragment>
  );
};

export default Login;
