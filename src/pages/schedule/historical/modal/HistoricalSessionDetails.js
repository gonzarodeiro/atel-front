import React from 'react';
import { Modal, Accordion, Card } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';

const HistoricalSessionDetails = ({ showModal, handleClose, obj, date }) => {
  return (
    <Modal show={showModal.details} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Detalle de la sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '14px', fontWeight: 'bold', color: '#66696b' }}>
        <div data-test='col'>
          <label className='mb-2'>Alumno: {obj.fullName} </label>
        </div>
        <div data-test='container' className='container-fluid section mb-4 border p-2'>
          <div className='text-center' style={{ marginTop: '2px', marginBottom: '-5px' }}>
            <label>Fecha: </label> {date}
            <label className='ml-2 mr-2'> - </label>Evaluación: {obj.evaluation}
            <label className='ml-2 mr-2'> - </label>Atención: {obj.attention}
          </div>
        </div>
        <Accordion className='pb-4'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0' style={{ textAlign: 'center', cursor: 'pointer', color: '#6c757d', fontWeight: 'bold', fontSize: '15px' }}>
              Herramienta de alfabetización
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <div className='row pb-2'>
                  <div className='col-md-12 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Observaciones realizadas: </label> <br />
                    {obj.alphabetical.observation}
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
              <Card.Body>
                <div className='row pb-2'>
                  <div className='col-md-12 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Observaciones realizadas: </label> <br />
                    {obj.numerical.observation}
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion className='pb-4'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0' style={{ textAlign: 'center', cursor: 'pointer', color: '#6c757d', fontWeight: 'bold', fontSize: '15px' }}>
              Pictogramas
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <div className='row pb-2'>
                  <div className='col-md-12 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Observaciones realizadas: </label> <br />
                    {obj.pictogram.observation}
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion className='pb-4'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0' style={{ textAlign: 'center', cursor: 'pointer', color: '#6c757d', fontWeight: 'bold', fontSize: '15px' }}>
              Observaciones generales
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>{obj.observation}</Card.Body>
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

export default HistoricalSessionDetails;
