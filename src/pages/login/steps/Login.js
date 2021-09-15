import React from 'react';
import { useHistory } from 'react-router-dom';
import { MDBInput, MDBBtn } from 'mdbreact';
import { BASE_URL } from '../../../config/environment';
import postResponseApi from '../../../utils/services/post/postResponseApi';

const Login = ({ handleChange, user, setSteps, errorsLogin, setErrorsLogin, setLoading }) => {
  let history = useHistory();

  function registration() {
    setSteps({ login: false, registration: true });
    setErrorsLogin({ show: false, message: '' });
  }

  function handleLogin(event) {
    event.preventDefault();
    setErrorsLogin({ message: '', show: false });
    if (!user.name && !user.password) {
      setErrorsLogin({ message: 'Debe ingresar usuario y contraseña', show: true });
      setTimeout(() => {
        setErrorsLogin({ message: '', show: false });
      }, 3000);
    } else checkUser();
  }

  async function checkUser() {
    setLoading(true);
    // const response = await postResponseApi(`${BASE_URL}/user`, params);
    const name = 'Gonzalo Rodeiro';
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('idProfessional', 1);
    setLoading(false);
    history.push(`/home`);
  }

  return (
    <React.Fragment>
      <form action=''>
        <div className='tittle'>¡Hola! Bienvenido</div>
        <div className='d-block' style={{ fontSize: '16px !important' }}>
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
