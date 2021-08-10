import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Layout from '../../utils/layout/index';
import Loading from '../../components/Loading';
import showAlert from '../../utils/commons/showAlert';
import Cancel from '../../components/html/button/Cancel';
import Submit from '../../components/html/button/Submit';
import { dlStudents, dlSessionType } from '../../utils/dropdownlists/index';
import postResponseApi from '../../utils/services/post/postResponseApi';
import status from '../../utils/enums/sessionStatus';
import convertDate from '../../utils/commons/convertDate';
import Dropdownlist from '../../components/html/Dropdownlist';
import { BASE_URL } from '../../config/environment';

const Index = () => {
  const [session, setSession] = useState({ type: '', userName: '', zoom: '', password: '' });
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
      const response = await postResponseApi(`${BASE_URL}/session`, filters);
      showMessage(response);
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
        id_professional: parseInt(sessionStorage.getItem('idProfessional')),
        status: status.Created,
        start_datetime: new Date(),
        room_name: student.name,
        type: session.type,
        room_zoom_name: session.zoom + '-' + session.password
      };
      return values;
    }

    async function showMessage(response) {
      setLoading(false);
      await showAlert('Sesión generada', `Se ha generado la sesión con ${student.name} `, 'success');
      const date = convertDate(new Date());
      if (session.type === 'Sesión de inclusión') {
        history.push({
          pathname: 'zoom-session',
          state: { roomId: student.name, userName: student.name, date: date, sessionId: response.data.id_session, roomZoom: session.zoom + '-' + session.password + '-' + sessionStorage.getItem('name') }
        });
      } else {
        history.push({
          pathname: 'professionalSession',
          state: { roomId: student.name, userName: student.name, date: date, sessionId: response.data.id_session }
        });
      }
    }
  };

  return (
    <Layout>
      <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Nueva sesión instantánea
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
                  <div className={session.type === 'Sesión de inclusión' ? 'col-md-4 my-1' : 'col-md-12 my-1'}>
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
                  {session.type === 'Sesión de inclusión' && (
                    <>
                      <div className='col-md-4 my-1'>
                        <label>Id de zoom</label>
                        <input id='zoom' onChange={handleChange} value={session.zoom} type='text' className={'form-control ' + (!session.zoom && showValidation ? 'borderRed' : '')} />
                      </div>
                      <div className='col-md-4 my-1'>
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
                  <Submit onClick={handleSubmit} title='Iniciar' />
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
