import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Layout from '../../../utils/layout/index';
import Cancel from '../../../components/html/button/Cancel';
import Submit from '../../../components/html/button/Submit';
import { dlStudents } from '../../../utils/dropdownlists/index';
import postResponseApi from '../../../utils/services/post/postResponseApi';
import Notification from '../../../components/html/Notification';

const Index = () => {
  const [session, setSession] = useState({ userName: '', password: '' });
  const [student, setStudent] = useState({ id: '', name: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [modal, showModal] = useState({ notification: false });
  const [errors, setErrors] = useState({ show: false, message: '' });
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    const fields = value.split('-');
    setSession({ ...session, [id]: value });
    setStudent({ id: fields[0], name: fields[1] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      const filters = createFilters();
      //   await postResponseApi('https://atel-back-stg.herokuapp.com/share-session', filters);
      const id = 12313;
      const sharedLink = window.location.href.replace('share-session', 'material-to-be-adapted/' + id);
      navigator.clipboard.writeText(sharedLink);
      showModal({ notification: true });
    }

    function validateFields() {
      if (!session.userName || !session.password) {
        setErrors({ show: true, message: 'Complete los campos obligatorios' });
        setShowValidation(true);
        return;
      }
      return true;
    }

    function createFilters() {
      return {
        id_student: parseInt(student.id),
        id_professional: 1, // levantar de sessionStorage
        password: session.password
      };
    }
  };

  return (
    <Layout>
      <div className='card shadow-sm container px-0' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Compartir sesiones con profesionales
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row'>
                <div className='col-md-6 my-1'>
                  <Form.Group>
                    <Form.Label> Nombre del alumno </Form.Label>
                    <Form.Control id='userName' onChange={handleChange} className={'form-control ' + (!session.userName && showValidation ? 'borderRed' : '')} value={session.userName} style={{ cursor: 'pointer' }} as='select'>
                      {dlStudents.map((file) => (
                        <option key={file.id} value={`${file.id}-${file.code}`}>
                          {file.description}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className='col-md-6 my-1'>
                  <label>Contraseña del profesional</label>
                  <input id='password' onChange={handleChange} value={session.password} type='text' className={'form-control ' + (!session.password && showValidation ? 'borderRed' : '')} />
                </div>
              </div>
              {modal.notification && <Notification title='Link copiado' message='Debe compartirlo con el profesional' />}
              <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-2'>
                <div className='col-md-6'>{errors.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errors.message}</div>}</div>
                <div className='col-md-6 d-flex justify-content-center justify-content-md-end my-2'>
                  <Cancel onClick={() => history.push(`/home`)} title='Volver' />
                  <Submit onClick={handleSubmit} title='Compartir' />
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
