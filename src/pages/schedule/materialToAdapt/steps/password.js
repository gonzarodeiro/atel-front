import React from 'react';
import Submit from '../../../../components/html/button/Submit';

const Password = ({ params, handleChange, showValidation, errors, handleSubmit }) => {
  return (
    <React.Fragment>
      <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
        <div className='row'>
          <div className='col-md-12 my-2 mb-3'>
            <label>Ingrese la contraseña</label>
            <input id='password' onChange={handleChange} value={params.password} type='text' className={'form-control ' + (!params.password && showValidation ? 'borderRed' : '')} />
          </div>
        </div>
        <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-2'>
          <div className='col-md-6'>{errors.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errors.message}</div>}</div>
          <div className='col-md-6 d-flex justify-content-center justify-content-md-end my-2'>
            <Submit onClick={handleSubmit} title='Siguiente' />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Password;
