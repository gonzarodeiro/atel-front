import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';
import Submit from '../../../../components/html/button/Submit';
import Loading from '../../../../components/Loading';
import postResponseApi from '../../../../utils/services/post/postResponseApi';
import showAlert from '../../../../utils/commons/showAlert';

const AdaptInformation = ({ showModal, handleClose, setShowValidation, setErrorsModal, errorsModal }) => {
  const [params, setParams] = useState({ file: '', comments: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      setLoading(true);
      setErrorsModal({ show: false });
      const values = { comments: params.comments, file: params.file };
      // await postResponseApi('https://atel-back-stg.herokuapp.com/session', values);
      console.log(values);
      setLoading(false);
      await showAlert('Material compartido', `Se ha subido el material a adaptar`, 'success');
      handleClose();
    }
  };

  function validateFields() {
    if (!params.file) {
      setErrorsModal({ show: true, message: 'Debe ingresar el archivo a adaptar' });
      setShowValidation(true);
      return;
    }
    return true;
  }

  function handleChange(event) {
    const { id, value } = event.target;
    setParams({ ...params, [id]: value });
  }

  return (
    <Modal show={showModal.adaptInformation} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Material a adaptar</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '13.2px', fontWeight: 'bold', color: '#66696b' }}>
        {loading && (
          <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
            <Loading />
          </div>
        )}
        <div className='row mb-1'>
          <div className='col-md-12'>
            <label>Ingrese contenido a adaptar</label>
            <input id='file' onChange={handleChange} value={params.file} type='file' className='form-control mb-2' style={{ height: '60px', padding: '14.5px' }} />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-md-12 my-1'>
            <label>Comentarios</label>
            <textarea id='comments' rows='3' onChange={handleChange} value={params.comments} type='text' className='form-control' />
          </div>
        </div>
        <div className='col-md-6 mb-3'>{errorsModal.show === true && <div className='text-danger mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errorsModal.message}</div>}</div>
        <Modal.Footer>
          <Cancel onClick={handleClose} title='Cancelar' />
          <Submit onClick={handleSubmit} title='Subir' />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default AdaptInformation;
