import { MDBBtn } from 'mdbreact';
import React from 'react';
import { Modal } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';
import Table from '../../../../components/html/Table';
import Loading from '../../../../components/Loading';

const DownloadMaterial = ({ showModal, handleClose, tableToAdapt, errorAdapt, setShowModal, loadingDownload }) => {
  function showImportMaterial() {
    setShowModal({ downloadMaterial: true, importMaterial: true });
  }

  return (
    <Modal show={showModal.downloadMaterial} onHide={() => handleClose('downloadMaterial')} size='xl' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Descargar material</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '13.2px', fontWeight: 'bold', color: '#66696b' }}>
        {loadingDownload && (
          <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
            <Loading />
          </div>
        )}
        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <MDBBtn onClick={showImportMaterial} className='blue darken-2 btnOption mr-2 mt-2 ml-0' style={{ marginBottom: '10px !important', marginRight: '5px !important', backgroundColor: '#dd4b39 !important', color: '#FFF', borderColor: '#dd4b39' }}>
            <i className='fas fa-plus-circle'></i>
            <span className='ml-2'>Importar material</span>
          </MDBBtn>
        </div>
        {tableToAdapt.show && (
          <div className='animated fadeInUp faster mb-1' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
            <span>
              <i className='fas fa-square ml-2' style={{ color: 'orange', marginBottom: '13px', marginLeft: '2px' }}></i> = Material a adaptar
            </span>
            <span>
              <i className='fas fa-square ml-2' style={{ color: '#388e3c' }}></i> = Material ya adaptado
            </span>
            <Table data={tableToAdapt} />
          </div>
        )}
        <div className='col-md-12 mt-2 mb-4 text-center'>{errorAdapt.show === true && <div className='text-danger p-1 mb-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {errorAdapt.message}</div>}</div>
        <Modal.Footer>
          <Cancel onClick={() => handleClose('downloadMaterial')} title='Cancelar' />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DownloadMaterial;
