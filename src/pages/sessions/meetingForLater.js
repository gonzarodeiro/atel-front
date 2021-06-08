import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../utils/layout/index';
import Loading from '../../components/Loading';
import Cancel from '../../components/html/button/Cancel';
import Submit from '../../components/html/button/Submit';
import Dropdownlist from '../../components/html/Dropdownlist';
import { dlStudents } from '../../utils/dropdownlists/index';
import showAlert from '../../utils/commons/showAlert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import datepicker from '../../utils/commons/datepicker';
registerLocale('es', datepicker);

const Index = () => {
  const [session, setSession] = useState({ name: '', date: new Date(), hour: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [errors, setErrors] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      setLoading(true);
      // const values = { ...session, age: parseInt(session.age) };
      //   postServiceData("endpoint", values);
      setLoading(false);
      await showAlert('Sesión programada', 'Código de la reunión: asdad', 'success');
      history.push({ pathname: 'schedule' });
    }
  };

  function validateFields() {
    if (!session.name || !session.hour) {
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
              Programar una sesión
            </div>
            {loading && (
              <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
                <Loading />
              </div>
            )}
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row'>
                <div className='col-md-4 my-1'>
                  <Dropdownlist title='Nombre del alumno' id='name' handleChange={handleChange} value={session.name} dropdownlist={dlStudents} disabledValue={false} className={'form-control ' + (!session.name && showValidation ? 'borderRed' : '')} />
                </div>
                <div className='col-md-4 my-1'>
                  <label>Fecha</label>
                  <DatePicker id='date' showYearDropdown scrollableMonthYearDropdown dateFormat='dd/MM/yyyy' placeholderText='Seleccione una fecha' selected={session.date} todayButton='Hoy' onChange={(date) => setSession({ ...session, date: date })} value={session.date} className='form-control' locale='es' />
                </div>
                <div className='col-md-4 my-1'>
                  <label>Horario</label>
                  <input id='hour' onChange={handleChange} value={session.hour} type='text' className={'form-control ' + (!session.hour && showValidation ? 'borderRed' : '')} />
                </div>
              </div>
              <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-2'>
                <div className='col-md-6'>{errors.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errors.message}</div>}</div>
                <div className='col-md-6 d-flex justify-content-center justify-content-md-end my-2'>
                  <Cancel onClick={() => history.push(`/home`)} title='Volver' />
                  <Submit onClick={handleSubmit} />
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
