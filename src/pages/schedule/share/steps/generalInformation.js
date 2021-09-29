import React from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Cancel from '../../../../components/html/button/Cancel';
import Submit from '../../../../components/html/button/Submit';

const GeneralInformation = ({ session, handleSubmit, showValidation, handleChange, errors, handleChangeStudent, apis }) => {
  let history = useHistory();

  return (
    <React.Fragment>
      <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
        <div className='row'>
          <div className='col-md-4 my-1'>
            <Form.Group>
              <Form.Label> Nombre del alumno </Form.Label>
              <Form.Control id='studentName' onChange={handleChangeStudent} className={'form-control ' + (!session.studentName && showValidation ? 'borderRed' : '')} value={session.studentName} style={{ cursor: 'pointer' }} as='select'>
                {apis.dlStudents.map((file) => (
                  <option key={file.id} value={`${file.id}-${file.fullName}`}>
                    {file.fullName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className='col-md-4 my-1'>
            <label>Nombre del profesional</label>
            <input id='name' onChange={handleChange} value={session.name} type='text' className={'form-control ' + (!session.name && showValidation ? 'borderRed' : '')} />
          </div>
          <div className='col-md-4 my-1'>
            <label>Contraseña del profesional</label>
            <input id='password' onChange={handleChange} value={session.password} type='text' className={'form-control ' + (!session.password && showValidation ? 'borderRed' : '')} />
          </div>
        </div>
        <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-2'>
          <div className='col-md-6'>{errors.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errors.message}</div>}</div>
          <div className='col-md-6 d-flex justify-content-center justify-content-md-end my-2'>
            <Cancel onClick={() => history.push(`/home`)} title='Volver' />
            <Submit onClick={handleSubmit} title='Siguiente' />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default GeneralInformation;
