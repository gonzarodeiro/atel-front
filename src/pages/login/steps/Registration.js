import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import Dropdownlist from '../../../components/html/Dropdownlist';
import showAlert from '../../../utils/commons/showAlert';
import { BASE_URL } from '../../../config/environment';
import { HttpStatusCode } from '../../../utils/enums/httpConstants';
import postResponseApi from '../../../utils/services/post/postResponseApi';
import getByFilters from '../../../utils/services/get/getByFilters';

const Registration = ({ handleChange, registration, setSteps, errorsRegistration, setErrorsRegistration, setRegistration }) => {
  const [passwordType, setPasswordType] = useState('password');
  const [apis, setApis] = useState({ dlProfession: [] });

  useEffect(() => {
    loadProfession();
  }, []);

  async function loadProfession() {
    let profession = await getByFilters(`${BASE_URL}/professional/types`);
    profession.unshift({ id: 0, code: '', description: 'Seleccione' });
    setApis({ dlProfession: profession });
  }

  function handlePrevStep() {
    setSteps({ login: true, registration: false });
    setErrorsRegistration({ show: false, message: '' });
  }

  async function handleRegistration(event) {
    event.preventDefault();
    setErrorsRegistration({ message: '', show: false });
    if (validateFields()) {
      const response = await postResponseApi(`${BASE_URL}/user`, registration);
      if (response.statusText === HttpStatusCode.Ok) {
        await showAlert('Profesional registrado', 'Ha sido registrado con éxito en el sistema', 'success');
        setSteps({ login: true, registration: false });
        setRegistration({ firstName: '', lastName: '', username: '', email: '', password: '', profession: '' });
      } else setErrorsRegistration({ show: true, message: `El usuario: ${registration.username} ya existe en el sistema` });
    }
  }

  function validateFields() {
    if (!registration.firstName || !registration.lastName || !registration.username || !registration.email || !registration.password || !registration.profession) {
      setErrorsRegistration({ show: true, message: 'Debe ingresar todos los campos' });
      setTimeout(() => {
        setErrorsRegistration({ message: '', show: false });
      }, 3000);
      return;
    }

    const validEmail = /\S+@\S+\.\S+/;
    if (!validEmail.test(registration.email)) {
      setErrorsRegistration({ show: true, message: 'Ingrese un email válido' });
      setTimeout(() => {
        setErrorsRegistration({ message: '', show: false });
      }, 3000);
      return;
    }

    return true;
  }

  function showPassword() {
    passwordType === 'text' ? setPasswordType('password') : setPasswordType('text');
  }

  return (
    <React.Fragment>
      <form action='' className='animated zoomIn faster'>
        <div className='tittle-registration '>Registrate</div>
        <div className='row' style={{ fontSize: '16px !important' }}>
          <div className='col-md-6 my-2'>
            <label>Nombre</label>
            <input id='firstName' onChange={handleChange} value={registration.firstName} type='text' className='form-control' />
          </div>
          <div className='col-md-6 my-2'>
            <label>Apellido</label>
            <input id='lastName' onChange={handleChange} value={registration.lastName} type='text' className='form-control' />
          </div>
        </div>
        <div className='row' style={{ fontSize: '16px !important' }}>
          <div className='col-md-6 my-2'>
            <label>Usuario</label>
            <input id='username' onChange={handleChange} value={registration.username} type='text' className='form-control' />
          </div>
          <div className='col-md-6 my-2'>
            <label>Contraseña</label>
            <div data-test='container'>
              <div data-test='input-group' class='input-group'>
                <input id='password' data-test='input' type={passwordType} onChange={handleChange} class='form-control' aria-disabled='false' value={registration.password} />
                <div class='input-group-append' onClick={showPassword}>
                  <span class='form-control input-group-text'>
                    <i class={passwordType === 'password' ? 'fas fa-eye mt-1' : 'fas fa-eye-slash mt-1'} title='Mostrar contraseña' style={{ cursor: 'pointer' }}></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-md-6 mb-3'>
            <label>Email</label>
            <input id='email' onChange={handleChange} value={registration.email} type='text' className='form-control' />
          </div>
          <div className='col-md-6'>
            <Dropdownlist title='Profesión' id='profession' handleChange={handleChange} value={registration.profession} dropdownlist={apis.dlProfession} disabledValue={false} className='form-control' />
          </div>
        </div>
        <div className='row text-center'>
          <div className='col-md-6'>
            <MDBBtn onClick={handlePrevStep} style={{ fontSize: '13px', padding: '11px 12px', marginTop: '25px' }} className={'btn-block rounded shadow-none btnCancel'}>
              <i className='fas fa-chevron-left'></i>
              <span className='ml-2'>Volver</span>
            </MDBBtn>
          </div>
          <div className='col-md-6'>
            <MDBBtn onClick={handleRegistration} rounded style={{ fontSize: '13px', padding: '11px 12px', marginTop: '28px', marginBottom: '35px' }} className={'btn-block rounded shadow-none blue darken-3 text-white'}>
              <span className='mr-2'>Registrarse</span>
              <i className='fas fa-chevron-right'></i>
            </MDBBtn>
          </div>
        </div>
        {errorsRegistration.show && (
          <div className='w-100 animated fadeInUp faster shadow mb-3' style={{ left: 0, bottom: -40, marginTop: '15px' }}>
            <span className='d-block small text-white text-center py-3 mx-auto rounded w-100' style={{ backgroundColor: '#e53935' }}>
              {errorsRegistration.message}
            </span>
          </div>
        )}
      </form>
    </React.Fragment>
  );
};

export default Registration;
