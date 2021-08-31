import React from 'react';
import { MDBBtn } from 'mdbreact';
import Dropdownlist from '../../../components/html/Dropdownlist';
import { dlProfession } from '../../../utils/dropdownlists/index';

const Registration = ({ handleChange, registration, handleRegistration, setSteps, errorsRegistration, setErrorsRegistration }) => {
  function handlePrevStep() {
    setSteps({ login: true, registration: false });
    setErrorsRegistration({ show: false, message: '' });
  }

  return (
    <React.Fragment>
      <form action='' className='animated zoomIn faster'>
        <div className='tittle-registration '>Registración</div>
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
            <MDBBtn onClick={handlePrevStep} style={{ fontSize: '14px', padding: '11px 12px', marginTop: '25px' }} className={'btn-block rounded shadow-none btnCancel'}>
              <i className='fas fa-chevron-left'></i>
              <span className='ml-2'>Volver</span>
            </MDBBtn>
          </div>
          <div className='col-md-6'>
            <MDBBtn onClick={handleRegistration} style={{ fontSize: '14px', padding: '11px 12px', marginTop: '25px', marginBottom: '35px' }} className={'btn-block rounded shadow-none blue darken-3 text-white'}>
              <span className='mr-2'>Registrarse</span>
              <i className='fas fa-chevron-right'></i>
            </MDBBtn>
          </div>
        </div>
        {errorsRegistration.show && (
          <div className='w-100 animated fadeInUp faster shadow' style={{ left: 0, bottom: -40, marginTop: '15px' }}>
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
