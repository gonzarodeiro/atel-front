import React from 'react';
import { Modal } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';
import Table from '../../../../components/html/Table';

const MaterialToAdapt = ({ showModal, handleClose, tableToAdapt, errorAdapt }) => {
  return (
    <Modal show={showModal.materialToAdapt} onHide={() => handleClose('materialToAdapt')} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Material a adaptar</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '13.2px', fontWeight: 'bold', color: '#66696b' }}>
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
