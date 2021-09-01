import React from 'react';
import { MDBBtn } from 'mdbreact';
import Dropdownlist from '../../../components/html/Dropdownlist';
import { dlProfession } from '../../../utils/dropdownlists/index';
import showAlert from '../../../utils/commons/showAlert';

const Registration = ({ handleChange, registration, setSteps, errorsRegistration, setErrorsRegistration, setRegistration }) => {
  function handlePrevStep() {
    setSteps({ login: true, registration: false });
    setErrorsRegistration({ show: false, message: '' });
  }

  async function handleRegistration(event) {
    event.preventDefault();
    setErrorsRegistration({ message: '', show: false });
    if (validateFields()) {
      await showAlert('Profesional registrado', 'Ha sido registrado con éxito en el sistema', 'success');
      setSteps({ login: true, registration: false });
      setRegistration({ name: '', user: '', email: '', password: '', profession: '' });
    }
  }

  function validateFields() {
    if (!registration.name || !registration.user || !registration.email || !registration.password || !registration.profession) {
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

  return (
    <React.Fragment>
      <form action='' className='animated zoomIn faster'>
        <div className='tittle-registration '>Registrate</div>
        <div className='row' style={{ fontSize: '16px !important' }}>
          <div className='col-md-6 my-2'>
            <label>Nombre y apellido</label>
            <input id='name' onChange={handleChange} value={registration.name} type='text' className='form-control' />
          </div>
          <div className='col-md-6 my-2'>
            <label>Usuario</label>
            <input id='user' onChange={handleChange} value={registration.user} type='text' className='form-control' />
          </div>
        </div>
        <div className='row' style={{ fontSize: '16px !important' }}>
          <div className='col-md-6 my-2'>
            <label>Contraseña</label>
            <input id='password' onChange={handleChange} value={registration.password} type='password' className='form-control' />
          </div>
          <div className='col-md-6 my-2'>
            <label>Email</label>
            <input id='email' onChange={handleChange} value={registration.email} type='text' className='form-control' />
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-md-12'>
            <Dropdownlist title='Profesión' id='profession' handleChange={handleChange} value={registration.profession} dropdownlist={dlProfession} disabledValue={false} className='form-control' />
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
            <MDBBtn onClick={handleRegistration} rounded style={{ fontSize: '13px', padding: '11px 12px', marginTop: '25px', marginBottom: '35px' }} className={'btn-block rounded shadow-none blue darken-3 text-white'}>
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
