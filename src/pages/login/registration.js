import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Loading from '../../components/Loading';
import Submit from '../../components/html/button/Submit';
import Cancel from '../../components/html/button/Cancel';
import showAlert from '../../utils/commons/showAlert';

const Registration = ({ showModal, handleClose }) => {
  const [user, setUser] = useState({ name: '', firstPassword: '', secondPassword: '', profession: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [errors, setErrors] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

  async function handleSubmit() {
    setLoading(true);
    if (validateFields()) {
      setLoading(false);
      await showAlert('Profesional registrado', 'Ha sido registrado con éxito en el sistema', 'success');
      handleClose();
    }
  }

  function validateFields() {
    if (!user.name || !user.firstPassword || !user.secondPassword) {
      setErrors({ show: true, message: 'Complete los campos obligatorios' });
      setShowValidation(true);
      return;
    }

    if (user.firstPassword !== user.secondPassword) {
      setErrors({ show: true, message: 'Debe ingresar la misma contraseña' });
      setShowValidation(true);
      return;
    }
    return true;
  }

  return (
    <Modal show={showModal.registration} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      {loading && (
        <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
          <Loading />
        </div>
      )}
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Registrarse en ATEL</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
        <div className='row mb-3'>
          <div className='col-md-4 my-2'>
            <label>Nombre </label>
            <input id='name' onChange={handleChange} value={user.name} type='text' className={'form-control ' + (!user.name && showValidation ? 'borderRed' : '')} />
          </div>
          <div className='col-md-4 my-2'>
            <label>Contraseña</label>
            <input id='firstPassword' onChange={handleChange} value={user.firstPassword} type='password' className={'form-control ' + (!user.firstPassword && showValidation ? 'borderRed' : '')} />
          </div>
          <div className='col-md-4 my-2'>
            <label>Repita la contraseña</label>
            <input id='secondPassword' onChange={handleChange} value={user.secondPassword} type='password' className={'form-control ' + (!user.secondPassword && showValidation ? 'borderRed' : '')} />
          </div>
        </div>
        <div className='col-md-12'>{errors.show === true && <div className='text-danger mb-3 rounded w-100 animated bounceInLeft faster errorMessage'>* {errors.message}</div>}</div>
        <Modal.Footer>
          <Cancel onClick={handleClose} title='Cancelar' />
          <Submit onClick={handleSubmit} />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default Registration;
