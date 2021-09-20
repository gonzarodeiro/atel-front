import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';
import Submit from '../../../../components/html/button/Submit';
import Loading from '../../../../components/Loading';
import patchApi from '../../../../utils/services/patch/patchApi';
import showAlert from '../../../../utils/commons/showAlert';
import { BASE_URL } from '../../../../config/environment';
import Dropdownlist from '../../../../components/html/Dropdownlist';
import { dlDifficulty } from '../../../../utils/dropdownlists/index';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import datepicker from '../../../../utils/commons/datepicker';
import addDays from '../../../../utils/commons/addDays';
registerLocale('es', datepicker);

const StudentDetails = ({ showModal, handleClose, student, handleChange, showValidation, errors, setErrors, setShowValidation, setStudent }) => {
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setStudent({ ...student, birthDate: addDays(student.birthDate) });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      setLoading(true);
      const params = getParams();
      await patchApi(`${BASE_URL}/student`, student.id, params);
      setLoading(false);
      await showAlert('Alumno modificado', `Se ha modificado los datos de: ${student.firstName} ${student.lastName}`, 'success');
      history.push({ pathname: 'home' });
    }
  };

  function getParams() {
    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      fullName: student.fullName,
      birthDate: student.birthDate,
      difficulty: student.difficulty,
      comments: student.comments
    };
  }

  function validateFields() {
    if (!student.firstName || !student.lastName || !student.difficulty) {
      setErrors({ show: true, message: 'Complete los campos obligatorios' });
      setShowValidation(true);
      return;
    }
    return true;
  }

  return (
    <Modal show={showModal.details} onHide={() => handleClose('details')} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Detalle del alumno</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '14px', fontWeight: 'bold', color: '#66696b' }}>
        {loading && (
          <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
            <Loading />
          </div>
        )}
        <div className='row'>
          <div className='col-md-3 my-1'>
            <label>Nombre</label>
            <input id='firstName' onChange={handleChange} value={student.firstName} type='text' className={'form-control ' + (!student.firstName && showValidation ? 'borderRed' : '')} />
          </div>
          <div className='col-md-3 my-1'>
            <label>Apellido</label>
            <input id='lastName' onChange={handleChange} value={student.lastName} type='text' className={'form-control ' + (!student.lastName && showValidation ? 'borderRed' : '')} />
          </div>
          <div className='col-md-3 my-1'>
            <label>Nacimiento</label>
            <DatePicker id='birthDate' showYearDropdown scrollableMonthYearDropdown dateFormat='dd/MM/yyyy' placeholderText='Seleccione una fecha' selected={student.birthDate} todayButton='Hoy' onChange={(date) => setStudent({ ...student, birthDate: date })} value={student.birthDate} className='form-control' locale='es' />
          </div>
          <div className='col-md-3 my-1'>
            <Dropdownlist title='Dificultad' id='difficulty' handleChange={handleChange} value={student.difficulty} dropdownlist={dlDifficulty} disabledValue={false} className={'form-control ' + (!student.difficulty && showValidation ? 'borderRed' : '')} />
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-md-12 my-2'>
            <label>Información sobre el alumno</label>
            <textarea id='comments' rows='5' onChange={handleChange} value={student.comments} type='text' className='form-control' />
          </div>
        </div>
        <div className='col-md-12'>{errors.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errors.message}</div>}</div>
        <Modal.Footer>
          <Cancel onClick={() => handleClose('details')} title='Cancelar' />
          <Submit onClick={handleSubmit} title='Modificar' />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default StudentDetails;
