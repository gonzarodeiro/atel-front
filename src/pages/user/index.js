import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import Layout from '../../utils/layout/index';
import Loading from '../../components/Loading';
import Submit from '../../components/html/button/Submit';
import Cancel from '../../components/html/button/Cancel';
import showAlert from '../../utils/commons/showAlert';
import Dropdownlist from '../../components/html/Dropdownlist';
import { dlProfession } from '../../utils/dropdownlists/index';
import swal from '@sweetalert/with-react';
import patchApi from '../../utils/services/patch/patchApi';
import { BASE_URL } from '../../config/environment';

const Index = () => {
  const [user, setUser] = useState({ name: '', userName: '', password: '', email: '', profession: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [errors, setErrors] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    loadUserDetails();
  }, []);

  function loadUserDetails() {
    setUser({
      name: 'Gonzalo Rodeiro',
      userName: 'grodeiro',
      password: '12345678',
      email: 'gonza.rodeiro@gmail.com',
      profession: 'Asistente social'
    });
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

  async function handleSubmit() {
    setLoading(true);
    if (validateFields()) {
      setLoading(false);
      await showAlert('Profesional modificado', 'Se han modificado los datos con éxito en el sistema', 'success');
      history.push(`/home`);
    }
    setLoading(false);
  }

  function validateFields() {
    if (!user.name || !user.userName || !user.password || !user.email || !user.profession) {
      setErrors({ show: true, message: 'Complete los campos obligatorios' });
      setShowValidation(true);
      return;
    }
    return true;
  }

  function handleDelete() {
    swal(
      <div>
        <p className='h4 mt-4 mb-4'>¿Querés dar de baja el usuario?</p>
        <span>Nombre: {user.name}</span>
        <p>Profesión: {user.profession}</p>
      </div>,
      {
        icon: 'warning',
        input: 'text',
        buttons: {
          cancel: 'No',
          catch: {
            text: 'Si',
            value: 'delete'
          }
        }
      }
    ).then((value) => {
      if (value === 'delete') patchUser();
    });
  }

  async function patchUser(session) {
    setLoading(true);
    const values = { status: 1 };
    await patchApi(`${BASE_URL}/session`, session.id, values);
    setLoading(false);
    await showAlert('Usuario eliminado', `El usuario: ${user.userName} ha sido dada de baja`, 'success');
    history.push(`/login`);
  }

  return (
    <Layout>
      <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Datos del profesional
            </div>
            {loading && (
              <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
                <Loading />
              </div>
            )}
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row mb-3'>
                <div className='col-md-4 my-2'>
                  <label>Nombre y apellido</label>
                  <input id='name' onChange={handleChange} value={user.name} type='text' className={'form-control ' + (!user.name && showValidation ? 'borderRed' : '')} />
                </div>
                <div className='col-md-4 my-2'>
                  <label>Usuario</label>
                  <input id='userName' onChange={handleChange} value={user.userName} type='text' className={'form-control ' + (!user.userName && showValidation ? 'borderRed' : '')} />
                </div>
                <div className='col-md-4 my-2'>
                  <label>Contraseña</label>
                  <input id='password' onChange={handleChange} value={user.password} type='password' className={'form-control ' + (!user.password && showValidation ? 'borderRed' : '')} />
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col-md-6 my-1'>
                  <label>Email</label>
                  <input id='email' onChange={handleChange} value={user.email} type='text' className={'form-control ' + (!user.email && showValidation ? 'borderRed' : '')} />
                </div>
                <div className='col-md-6 my-1'>
                  <Dropdownlist title='Profesión' id='profession' handleChange={handleChange} value={user.profession} dropdownlist={dlProfession} disabledValue={false} className={'form-control ' + (!user.profession && showValidation ? 'borderRed' : '')} />
                </div>
              </div>
              <div className='mb-3' style={{ textAlign: 'left', marginLeft: '-4px', marginTop: '10px' }}>
                <MDBBtn onClick={handleDelete} className='red darken-2 btnOption' style={{ backgroundColor: '#dd4b39', color: '#FFF', borderColor: '#dd4b39 !important' }}>
                  <i className='fas fa-trash'></i>
                  <span className='ml-2'>Eliminar cuenta</span>
                </MDBBtn>
              </div>
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
