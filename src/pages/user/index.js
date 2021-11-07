import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import Layout from '../../utils/layout/index';
import Loading from '../../components/Loading';
import Submit from '../../components/html/button/Submit';
import Cancel from '../../components/html/button/Cancel';
import showAlert from '../../utils/commons/showAlert';
import Dropdownlist from '../../components/html/Dropdownlist';
import swal from '@sweetalert/with-react';
import { BASE_URL } from '../../config/environment';
import getResponseById from '../../utils/services/get/getById/getResponseById';
import deleteResponseApi from '../../utils/services/delete/deleteResponseApi';
import { HttpStatusCode } from '../../utils/enums/httpConstants';
import patchResponseApi from '../../utils/services/patch/patchResponseApi';
import getByFilters from '../../utils/services/get/getByFilters';

const Index = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '', username: '', password: '', email: '', profession: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [errors, setErrors] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [apis, setApis] = useState({ dlProfession: [] });
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else {
      loadProfession();
      loadUserDetails();
    }
  }, []);

  async function loadProfession() {
    let profession = await getByFilters(`${BASE_URL}/professional/types`);
    profession.unshift({ id: 0, code: '', description: 'Seleccione' });
    setApis({ dlProfession: profession });
  }

  async function loadUserDetails() {
    let result = await getResponseById(`${BASE_URL}/user`, parseInt(sessionStorage.getItem('idProfessional')));
    setUser(result.data);
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

  async function handleSubmit() {
    setLoading(true);
    if (validateFields()) {
      const response = await patchResponseApi(`${BASE_URL}/user`, parseInt(sessionStorage.getItem('idProfessional')), user);
      if (response.statusText === HttpStatusCode.Ok) {
        setLoading(false);
        await showAlert('Profesional modificado', 'Se han modificado los datos con éxito en el sistema', 'success');
        history.push(`/home`);
      } else {
        setLoading(false);
        setErrors({ show: true, message: `El usuario: ${user.username} ya existe en el sistema` });
      }
    }
  }

  function validateFields() {
    if (!user.firstName || !user.lastName || !user.username || !user.password || !user.email || !user.profession) {
      setErrors({ show: true, message: 'Complete los campos obligatorios' });
      setShowValidation(true);
      return;
    }

    const validEmail = /\S+@\S+\.\S+/;
    if (!validEmail.test(user.email)) {
      setErrors({ show: true, message: 'Ingrese un email válido' });
      return;
    }

    return true;
  }

  function handleDelete() {
    swal(
      <div>
        <p className='h4 mt-4 mb-4'>¿Querés dar de baja el usuario?</p>
        <span>
          Nombre: {user.firstName} {user.lastName}
        </span>
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
      if (value === 'delete') deleteUser();
    });
  }

  async function deleteUser() {
    setLoading(true);
    const idProfessional = parseInt(sessionStorage.getItem('idProfessional'));
    await deleteResponseApi(`${BASE_URL}/user/${idProfessional}`);
    setLoading(false);
    await showAlert('Usuario eliminado', `El usuario: ${user.username} ha sido dada de baja`, 'success');
    history.push(`/login`);
  }

  function showPassword() {
    passwordType === 'text' ? setPasswordType('password') : setPasswordType('text');
  }

  return (
    <Layout>
      <div className='card shadow-sm container px-0 mb-4' style={{ border: '1px solid #cecbcb' }}>
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
                  <label>Nombre</label>
                  <input id='firstName' onChange={handleChange} value={user.firstName} type='text' className={'form-control ' + (!user.firstName && showValidation ? 'borderRed' : '')} />
                </div>
                <div className='col-md-4 my-2'>
                  <label>Apellido</label>
                  <input id='lastName' onChange={handleChange} value={user.lastName} type='text' className={'form-control ' + (!user.lastName && showValidation ? 'borderRed' : '')} />
                </div>
                <div className='col-md-4 my-2'>
                  <label>Usuario</label>
                  <input id='username' onChange={handleChange} value={user.username} type='text' className={'form-control ' + (!user.username && showValidation ? 'borderRed' : '')} />
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col-md-4 my-1 mb-3'>
                  <label>Contraseña</label>
                  <div data-test='container'>
                    <div data-test='input-group' class='input-group'>
                      <input id='password' onChange={handleChange} type={passwordType} class='form-control' value={user.password} />
                      <div class='input-group-append' onClick={showPassword}>
                        <span class='form-control input-group-text'>
                          <i class={passwordType === 'password' ? 'fas fa-eye mt-1' : 'fas fa-eye-slash mt-1'} title={passwordType === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña'} style={{ cursor: 'pointer' }}></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-4 my-1 mb-3'>
                  <label>Email</label>
                  <input id='email' onChange={handleChange} value={user.email} type='text' className={'form-control ' + (!user.email && showValidation ? 'borderRed' : '')} />
                </div>
                <div className='col-md-4 my-1'>
                  <Dropdownlist title='Profesión' id='profession' handleChange={handleChange} value={user.profession} dropdownlist={apis.dlProfession} disabledValue={false} className={'form-control ' + (!user.profession && showValidation ? 'borderRed' : '')} />
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
                  <Submit onClick={handleSubmit} title='Actualizar' />
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
