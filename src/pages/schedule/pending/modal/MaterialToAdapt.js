import { MDBBtn } from 'mdbreact';
import React from 'react';
import { Modal } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';
import Table from '../../../../components/html/Table';

const MaterialToAdapt = ({ showModal, handleClose, tableToAdapt, errorAdapt, setShowModal }) => {
  function showAdaptedInformation() {
    setShowModal({ materialToAdapt: true, adaptInformation: true });
  }

  return (
    <Modal show={showModal.materialToAdapt} onHide={() => handleClose('materialToAdapt')} size='xl' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Descargar material</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '13.2px', fontWeight: 'bold', color: '#66696b' }}>
        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <MDBBtn onClick={showAdaptedInformation} className='blue darken-2 btnOption mr-2 mt-2 ml-0' style={{ marginBottom: '10px !important', marginRight: '5px !important', backgroundColor: '#dd4b39 !important', color: '#FFF', borderColor: '#dd4b39' }}>
            <i className='fas fa-plus-circle'></i>
            <span className='ml-2'>Importar material</span>
          </MDBBtn>
        </div>
        {tableToAdapt.show && <Table data={tableToAdapt} />}
        <div className='col-md-6 mt-2 mb-4'>{errorAdapt.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errorAdapt.message}</div>}</div>
        <Modal.Footer>
          <Cancel onClick={() => handleClose('materialToAdapt')} title='Cancelar' />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default MaterialToAdapt;
