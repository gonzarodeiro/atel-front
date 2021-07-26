import React from 'react';
import { Modal } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';
import Table from '../../../../components/html/Table';

const DeleteInformation = ({ showModal, handleClose, tableDelete, errorDelete }) => {
  return (
    <Modal show={showModal.deleteInformation} onHide={() => handleClose('deleteInformation')} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Eliminar material a adaptar</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '13.2px', fontWeight: 'bold', color: '#66696b' }}>
        {tableDelete.show && <Table data={tableDelete} />}
        <div className='col-md-6 mt-2 mb-4'>{errorDelete.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errorDelete.message}</div>}</div>
        <Modal.Footer>
          <Cancel onClick={() => handleClose('deleteInformation')} title='Cancelar' />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteInformation;
