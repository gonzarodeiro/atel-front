import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Layout from '../../utils/layout/index';
import Loading from '../../components/Loading';
import Cancel from '../../components/html/button/Cancel';
import Submit from '../../components/html/button/Submit';
import { dlSessionType } from '../../utils/dropdownlists/index';
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
import getByFilters from '../../utils/services/get/getByFilters';
registerLocale('es', datepicker);

const Index = () => {
  const [session, setSession] = useState({ type: '', userName: '', date: new Date(), zoom: '', password: '' });
  const [student, setStudent] = useState({ id: '', name: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [errors, setErrors] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [apis, setApis] = useState({ dlStudents: [] });
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else loadStudents();
  }, []);

  async function loadStudents() {
    const filters = { idProfessional: parseInt(sessionStorage.getItem('idProfessional')) };
    let students = await getByFilters(`${BASE_URL}/student/search`, filters);
    students.unshift({ id: 0, fullName: 'Seleccione' });
    setApis({ dlStudents: students });
  }

  const handleChangeStudent = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
    const student = decodeOptionValue(value);
    setStudent(student);
  };

  function encodeOptionValue(idStudent, fullName) {
    return JSON.stringify({ id: idStudent, name: fullName });
  }

  function decodeOptionValue(value) {
    return JSON.parse(value);
  }

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
      if (session.type === 'Sesi??n de inclusi??n' && !session.zoom) {
        setErrors({ show: true, message: 'Debe ingresar el id de zoom' });
        setShowValidation(true);
        return;
      }
      return true;
    }

    function createFilters() {
      const values = {
        id_student: parseInt(student.id),
        id_professional: parseInt(sessionStorage.getItem('idProfessional')),
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
      await showAlert('Sesi??n programada', `Se ha programado la sesi??n para el d??a ${date} `, 'success');
      history.push({ pathname: 'home' });
    }
  };

  return (
    <Layout>
      <div className='card shadow-sm container px-0' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Programar una sesi??n
            </div>
            {loading && (
              <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
                <Loading />
              </div>
            )}
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row'>
                <div className='col-md-12 my-1'>
                  <Dropdownlist title='Tipo de sesi??n' id='type' handleChange={handleChange} value={session.type} dropdownlist={dlSessionType} disabledValue={false} className={'form-control ' + (!session.type && showValidation ? 'borderRed' : '')} />
                </div>
              </div>
              {session.type && (
                <div className='row'>
                  <div className={session.type === 'Sesi??n de inclusi??n' ? 'col-md-3 my-1' : 'col-md-6 my-1'}>
                    <Form.Group>
                      <Form.Label> Nombre del alumno </Form.Label>
                      <Form.Control id='userName' onChange={handleChangeStudent} className={'form-control ' + (!session.userName && showValidation ? 'borderRed' : '')} value={session.userName} style={{ cursor: 'pointer' }} as='select'>
                        {apis.dlStudents.map((s) => (
                          <option key={s.id} value={encodeOptionValue(s.id, s.fullName)}>
                            {s.fullName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className={session.type === 'Sesi??n de inclusi??n' ? 'col-md-3 my-1' : 'col-md-6 my-1'}>
                    <label>Fecha y hora</label>
                    <DatePicker id='date' showTimeSelect timeFormat='HH:mm' timeIntervals={30} minDate={new Date()} dateFormat='dd/MM/yyyy - hh:mm aa' selected={session.date} todayButton='Hoy' onChange={(date) => setSession({ ...session, date: date })} value={session.date} className='form-control' timeCaption='Hora' />
                  </div>
                  {session.type === 'Sesi??n de inclusi??n' && (
                    <>
                      <div className='col-md-3 my-1'>
                        <label>ID de zoom</label>
                        <input id='zoom' onChange={handleChange} value={session.zoom} type='text' className={'form-control ' + (!session.Zoom && showValidation ? 'borderRed' : '')} />
                      </div>
                      <div className='col-md-3 my-1'>
                        <label>C??digo de acceso</label>
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
