import React from 'react';
import { Modal, Accordion, Card } from 'react-bootstrap';
import Cancel from '../../../components/html/button/Cancel';

const ScheduleDetails = ({ showModal, handleClose }) => {
  return (
    <Modal show={showModal.details} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Detalle de la sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '14px', fontWeight: 'bold', color: '#66696b' }}>
        <div className='pb-3 mt-1' style={{ fontWeight: 'bold', fontSize: '14px' }}>
          <label style={{ fontWeight: 'bold', marginRight: '5px' }}>Alumno: </label>
          German Perez - 01/06/2021
        </div>
        <Accordion className='pb-4'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0' style={{ textAlign: 'center', cursor: 'pointer', color: '#6c757d', fontWeight: 'bold', fontSize: '15px' }}>
              Herramienta de alfabetización
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <div className='row pb-2'>
                  <div className='col-md-3 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Intentos: </label> <br />5
                  </div>
                  <div className='col-md-3 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Aciertos: </label> <br />4
                  </div>
                  <div className='col-md-3 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Errores: </label> <br />1
                  </div>
                  <div className='col-md-3 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Efectividad: </label> <br />
                    80%
                  </div>
                </div>
                <div className='row pb-2'>
                  <div className='col-md-12 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Observaciones realizadas: </label> <br />
                    Durante la sesión note que estuvo enfocado y logro entender la actividad
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion className='pb-4'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0' style={{ textAlign: 'center', cursor: 'pointer', color: '#6c757d', fontWeight: 'bold', fontSize: '15px' }}>
              Herramienta numérica y lógica
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion className='pb-4'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0' style={{ textAlign: 'center', cursor: 'pointer', color: '#6c757d', fontWeight: 'bold', fontSize: '15px' }}>
              Pictogramas
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion className='pb-4'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0' style={{ textAlign: 'center', cursor: 'pointer', color: '#6c757d', fontWeight: 'bold', fontSize: '15px' }}>
              Observaciones generales
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Modal.Footer>
          <Cancel onClick={handleClose} title='Cancelar' />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ScheduleDetails;
