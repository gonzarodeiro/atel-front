import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Layout from '../../utils/layout/index';
import Loading from '../../components/Loading';
import Cancel from '../../components/html/button/Cancel';
import Submit from '../../components/html/button/Submit';
import { dlStudents, dlSessionType } from '../../utils/dropdownlists/index';
import showAlert from '../../utils/commons/showAlert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import datepicker from '../../utils/commons/datepicker';
import status from '../../utils/enums/sessionStatus';
import postResponseApi from '../../utils/services/post/postResponseApi';
import convertDateTime from '../../utils/commons/convertDateTime';
import Dropdownlist from '../../components/html/Dropdownlist';
import { BASE_URL } from '../../config/environment';

registerLocale('es', datepicker);

const Index = () => {
  const [session, setSession] = useState({ type: '', userName: '', date: new Date(), zoom: '', password: '' });
  const [student, setStudent] = useState({ id: '', name: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [errors, setErrors] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
  }, []);

  const handleChangeStudent = (event) => {
    const { id, value } = event.target;
    const fields = value.split('-');
    setSession({ ...session, [id]: value });
    setStudent({ id: fields[0], name: fields[1] });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      setLoading(true);
      const filters = createFilters();
      await postResponseApi(`${BASE_URL}/session`, filters);
      showMessage();
    }

    function validateFields() {
      if (!session.type || !session.userName) {
        setErrors({ show: true, message: 'Complete los campos obligatorios' });
        setShowValidation(true);
        return;
      }
      if (session.type === 'Sesión de inclusión' && !session.zoom) {
        setErrors({ show: true, message: 'Debe ingresar el id de zoom' });
        setShowValidation(true);
        return;
      }
      return true;
    }

    function createFilters() {
      const values = {
        id_student: parseInt(student.id),
        id_professional: 1, // levantar de sessionStorage
        status: status.Pending,
        start_datetime: session.date,
        room_name: student.name,
        type: session.type,
        zoom: session.zoom,
        password: session.password
      };
      return values;
    }

    async function showMessage() {
      const date = convertDateTime(session.date);
      setLoading(false);
      await showAlert('Sesión programada', `Se ha programado la sesión para el día ${date} `, 'success');
      history.push({ pathname: 'home' });
    }
  };

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
                <div className='col-md-12 my-1'>
                  <Dropdownlist title='Tipo de sesión' id='type' handleChange={handleChange} value={session.type} dropdownlist={dlSessionType} disabledValue={false} className={'form-control ' + (!session.type && showValidation ? 'borderRed' : '')} />
                </div>
              </div>
              {session.type && (
                <div className='row'>
                  <div className={session.type === 'Sesión de inclusión' ? 'col-md-3 my-1' : 'col-md-6 my-1'}>
                    <Form.Group>
                      <Form.Label> Nombre del alumno </Form.Label>
                      <Form.Control id='userName' onChange={handleChangeStudent} className={'form-control ' + (!session.userName && showValidation ? 'borderRed' : '')} value={session.userName} style={{ cursor: 'pointer' }} as='select'>
                        {dlStudents.map((file) => (
                          <option key={file.id} value={`${file.id}-${file.code}`}>
                            {file.description}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className={session.type === 'Sesión de inclusión' ? 'col-md-3 my-1' : 'col-md-6 my-1'}>
                    <label>Fecha y hora</label>
                    <DatePicker id='date' showTimeSelect timeFormat='HH:mm' timeIntervals={30} minDate={new Date()} dateFormat='dd/MM/yyyy - hh:mm aa' selected={session.date} todayButton='Hoy' onChange={(date) => setSession({ ...session, date: date })} value={session.date} className='form-control' timeCaption='Hora' />
                  </div>
                  {session.type === 'Sesión de inclusión' && (
                    <>
                      <div className='col-md-3 my-1'>
                        <label>ID de zoom</label>
                        <input id='zoom' onChange={handleChange} value={session.zoom} type='text' className={'form-control ' + (!session.Zoom && showValidation ? 'borderRed' : '')} />
                      </div>
                      <div className='col-md-3 my-1'>
                        <label>Código de acceso</label>
                        <input id='password' onChange={handleChange} value={session.password} type='text' className='form-control' />
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-2'>
                <div className='col-md-6'>{errors.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errors.message}</div>}</div>
                <div className='col-md-6 d-flex justify-content-center justify-content-md-end my-2'>
                  <Cancel onClick={() => history.push(`/home`)} title='Volver' />
                  <Submit onClick={handleSubmit} title='Guardar' />
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
