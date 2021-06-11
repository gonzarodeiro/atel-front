import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../utils/layout/index';
import Loading from '../../components/Loading';
import Submit from '../../components/html/button/Submit';
import Cancel from '../../components/html/button/Cancel';
import showAlert from '../../utils/commons/showAlert';
import Dropdownlist from '../../components/html/Dropdownlist';
import { dlProfession } from '../../utils/dropdownlists/index';

const Index = () => {
  const [user, setUser] = useState({ name: '', userName: '', password: '', profession: '' });
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
    }
    setLoading(false);
  }

  function validateFields() {
    if (!user.name || !user.userName || !user.password || !user.profession) {
      setErrors({ show: true, message: 'Complete los campos obligatorios' });
      setShowValidation(true);
      return;
    }
    return true;
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
                  <label>Nombre y apellido </label>
                  <input id='name' onChange={handleChange} value={user.name} type='text' className={'form-control ' + (!user.name && showValidation ? 'borderRed' : '')} />
                </div>
                <div className='col-md-4 my-2'>
                  <label>Usuario </label>
                  <input id='userName' onChange={handleChange} value={user.userName} type='text' className={'form-control ' + (!user.userName && showValidation ? 'borderRed' : '')} />
                </div>
                <div className='col-md-4 my-2'>
                  <label>Contraseña</label>
                  <input id='password' onChange={handleChange} value={user.password} type='password' className={'form-control ' + (!user.password && showValidation ? 'borderRed' : '')} />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-md-12 my-1'>
                  <Dropdownlist title='Profesión' id='profession' handleChange={handleChange} value={user.profession} dropdownlist={dlProfession} disabledValue={false} className={'form-control ' + (!user.profession && showValidation ? 'borderRed' : '')} />
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
