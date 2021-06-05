import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBMask, MDBView } from 'mdbreact';
import './../../styles/css/login.css';
import Loading from '../../components/Loading';
import Registration from './registration';
import postApi from '../../utils/services/post/postApi';

const Index = () => {
  const [values, setValues] = useState({ user: '', password: '' });
  const [errors, setErrors] = useState({ message: '', show: false });
  const [showModal, setShowModal] = useState({ registration: false });
  const [isLoading, setLoading] = useState(false);
  let history = useHistory();

  function handleChange(event) {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors({ message: '', show: false });
    if (!values.user && !values.password) setErrors({ message: 'Debe ingresar usuario y contraseña', show: true });
    else loginUser();
  }

  async function loginUser() {
    setLoading(true);
    // const params = { user: values.user.toUpperCase(), password: values.password };
    // await postApi(process.env.REACT_APP_API_LOGIN, params);
    const name = 'Gonzalo Rodeiro';
    sessionStorage.setItem('name', name);
    setLoading(false);
    history.push(`/home`);
  }

  function registration() {
    setShowModal({ registration: true });
  }

  function handleClose() {
    setShowModal({ registration: false });
  }

  return (
    <div id='contactformpage'>
      <MDBView>
        <MDBMask overlay='black-strong' />
        <form className='login'>
          <div block-ui='content' className='panel-primary'>
            <div className='container login-box'>
              {isLoading && (
                <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
                  <Loading />
                </div>
              )}
              <div className='title-header'>ATEL - Asistente terapéutico en línea</div>
              <div className='tittle'>¡Hola! Bienvenido</div>
              <div className='d-block mt-3' style={{ fontSize: '16px !important' }}>
                <MDBInput label='Usuario' id='user' onChange={handleChange} value={values.user} group type='text' validate success='right' style={{ marginBottom: '25px' }} />
                <MDBInput label='Contraseña' id='password' onChange={handleChange} value={values.password} group type='password' validate='container' className='mb-4' />
              </div>
              <div className='text-center mt-3 black-text'>
                <MDBBtn onClick={handleSubmit} rounded style={{ fontSize: '14px', padding: '11px 12px', marginTop: '37px', marginBottom: '35px' }} className={'btn-block rounded shadow-none blue darken-3 text-white'}>
                  Iniciar Sesión
                  <div className='position-absolute' style={{ right: 13, top: 17 }}></div>
                </MDBBtn>
                <hr className='hr-light mb-3 mt-4' />
                <div className='text-center d-flex justify-content-center white-label' style={{ color: 'rgb(152, 152, 152)', fontSize: '15px', fontWeight: '500' }}>
                  ¿No tienes una cuenta?
                  <b className='ml-2' onClick={registration} style={{ cursor: 'pointer' }}>
                    Registrate
                  </b>
                </div>
              </div>
              {errors.show && (
                <div className='w-100 animated fadeInUp faster shadow' style={{ left: 0, bottom: -40, marginTop: '45px' }}>
                  <span className='d-block small text-white text-center py-3 mx-auto rounded w-100' style={{ backgroundColor: '#e53935' }}>
                    {errors.message}
                  </span>
                </div>
              )}
              {showModal.registration && <Registration showModal={showModal} handleClose={handleClose} />}
            </div>
          </div>
        </form>
      </MDBView>
    </div>
  );
};

export default Index;
