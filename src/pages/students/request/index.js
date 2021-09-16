import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../utils/layout/index';
import Loading from '../../../components/Loading';
import Cancel from '../../../components/html/button/Cancel';
import Submit from '../../../components/html/button/Submit';
import Dropdownlist from '../../../components/html/Dropdownlist';
import { dlDifficulty } from '../../../utils/dropdownlists/index';
import showAlert from '../../../utils/commons/showAlert';
import postResponseApi from '../../../utils/services/post/postResponseApi';
import { BASE_URL } from '../../../config/environment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import datepicker from '../../../utils/commons/datepicker';
registerLocale('es', datepicker);

const Index = () => {
  const [student, setStudent] = useState({ firstName: '', lastName: '', birthdate: new Date(), difficulty: '', comments: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [errors, setErrors] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setStudent({ ...student, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      setLoading(true);
      const values = { ...student };
      const response = await postResponseApi(`${BASE_URL}/student`, values);
      console.log(response);
      setLoading(false);
      await showAlert('Alumno registrado', 'El alumno ha sido registrado en el sistema', 'success');
      history.push({ pathname: 'home' });
    }
  };

  function validateFields() {
    if (!student.firstName || !student.lastName || !student.difficulty) {
      setErrors({ show: true, message: 'Complete los campos obligatorios' });
      setShowValidation(true);
      return;
    }
    return true;
  }

  return (
    <Layout>
      <div className='card shadow-sm container px-0' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Alta del alumno
            </div>
            {loading && (
              <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
                <Loading />
              </div>
            )}
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
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
                  <DatePicker id='birthdate' showYearDropdown scrollableMonthYearDropdown dateFormat='dd/MM/yyyy' placeholderText='Seleccione una fecha' selected={student.birthdate} todayButton='Hoy' onChange={(date) => setStudent({ ...student, birthdate: date })} value={student.birthdate} className='form-control' locale='es' />
                </div>
                <div className='col-md-3 my-1'>
                  <Dropdownlist title='Dificultad' id='difficulty' handleChange={handleChange} value={student.difficulty} dropdownlist={dlDifficulty} disabledValue={false} className={'form-control ' + (!student.difficulty && showValidation ? 'borderRed' : '')} />
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-md-12 my-2'>
                  <label>Información sobre el alumno</label>
                  <textarea id='comments' rows='5' onChange={handleChange} value={student.comments} type='text' className='form-control' />
                </div>
              </div>
              <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-2'>
                <div className='col-md-6'>{errors.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errors.message}</div>}</div>
                <div className='col-md-6 d-flex justify-content-center justify-content-md-end my-2'>
                  <Cancel onClick={() => history.push(`/home`)} title='Volver' />
                  <Submit onClick={handleSubmit} title='Registrar' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
