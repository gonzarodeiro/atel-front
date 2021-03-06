import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';
import Submit from '../../../../components/html/button/Submit';
import Loading from '../../../../components/Loading';
import postFileApi from '../../../../utils/services/post/postFileApi';
import showAlert from '../../../../utils/commons/showAlert';
import { BASE_URL } from '../../../../config/environment';

const ImportMaterial = ({ showModal, handleClose, setShowModal, modalData }) => {
  const [params, setParams] = useState({ file: '', comments: '' });
  const [loading, setLoading] = useState(false);
  const [errorsModal, setErrorsModal] = useState({ show: false, message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      setLoading(true);
      setErrorsModal({ show: false });
      const sessionID = modalData.id;
      const values = { sessionID: sessionID, comments: params.comments, file: params.file, author: sessionStorage.getItem('name') };
      await postFileApi(`${BASE_URL}/document/session`, values);
      setLoading(false);
      await showAlert('Material importado', `Se ha subido el material adaptado`, 'success');
      handleClose('importMaterial');
    }
  };

  function validateFields() {
    if (!params.file) {
      setErrorsModal({ show: true, message: 'Debe ingresar el material adaptado' });
      return;
    }
    return true;
  }
  function handleChangeInputText(event) {
    const { id, value } = event.target;
    setParams({ ...params, [id]: value });
  }

  function handleChangeInputFile(event) {
    const { id } = event.target;
    setParams({ ...params, [id]: event.target.files[0] }); // Utilizamos el elemento de tipo File en lugar de target.value
  }

  function closeAdapt() {
    if (showModal.downloadMaterial) setShowModal({ downloadMaterial: true, importMaterial: false });
    else setShowModal({ importMaterial: false });
  }

  return (
    <Modal show={showModal.importMaterial} onHide={() => handleClose('importMaterial')} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Importar material adaptado</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '13.2px', fontWeight: 'bold', color: '#66696b' }}>
        {loading && (
          <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
            <Loading />
          </div>
        )}
        <div className='row mb-1'>
          <div className='col-md-12'>
            <label>Ingrese material adaptado</label>
            <input id='file' name='content' onChange={handleChangeInputFile} type='file' className='form-control mb-2' style={{ height: '60px', padding: '14.5px' }} />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-md-12 my-1'>
            <label>Comentarios</label>
            <textarea id='comments' rows='3' onChange={handleChangeInputText} value={params.comments} type='text' className='form-control' />
          </div>
        </div>
        <div className='col-md-6 mb-3'>{errorsModal.show === true && <div className='text-danger mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errorsModal.message}</div>}</div>
        <Modal.Footer>
          <Cancel onClick={closeAdapt} title='Cancelar' />
          <Submit onClick={handleSubmit} title='Subir' />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ImportMaterial;
