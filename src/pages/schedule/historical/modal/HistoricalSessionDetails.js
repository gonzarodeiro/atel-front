import { MDBBtn } from 'mdbreact';
import React from 'react';
import { Modal, Accordion, Card } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';
import Table from '../../../../components/html/Table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const HistoricalSessionDetails = ({ showModal, handleClose, obj, date, aritmeticTable, matchesTable, avgTime }) => {
  async function exportPDF() {
    const doc = new jsPDF('p', 'pt', 'A4', true);
    const title = `Detalles de la sesión con: ${obj.fullName}`;
    doc.setFontSize(14);
    doc.text(title, 40, 40);
    const textWidth = doc.getTextWidth(title);
    doc.line(40, 45, 40 + textWidth, 45);
    createHeader(doc, obj);
    showInfoTools(doc);
    doc.save(obj.fullName + '.pdf');
  }

  function createHeader(doc, obj) {
    doc.setFontSize(12);
    doc.text('Fecha:', 40, 75);
    doc.text(date, 85, 75);
    doc.text('Evaluación:', 260, 75);
    doc.text(obj.evaluation ? obj.evaluation : '-', 330, 75);
    doc.text('Atención:', 440, 75);
    doc.text(obj.attention ? obj.attention : '-', 495, 75);
    doc.text('Observaciones generales:', 40, 110);
    doc.text(40, 130, obj.observation ? obj.observation : '-', { maxWidth: 520, align: 'justify' });
  }

  function showInfoTools(doc) {
    if (obj.alphabetical) {
      showToolHeader(doc, 'Herramienta alfabética', 180, 204, obj.alphabetical.observation, 225);
      doc.addPage();
    }

    if (obj.numerical) {
      showToolHeader(doc, 'Herramienta numérica y lógica', 75, 106, obj.alphabetical.observation, 128);
      if (Object.keys(obj.numerical.statistics.aritmetic).length > 0) showNumericalTool(doc, aritmeticTable, [['Operación', 'Intentos', 'Aciertos', 'Errores', 'Efectividad']], 160);
      if (Object.keys(obj.numerical.statistics.matches).length > 0) showNumericalTool(doc, matchesTable, [['Elemento', 'Intentos', 'Aciertos', 'Errores', 'Efectividad']], 315);
    }
  }

  function showToolHeader(doc, title, startY, observationLabel, observationObj, observationText) {
    doc.setFontSize(14);
    doc.text(title, 40, startY);
    const textWidth = doc.getTextWidth(title);
    doc.line(40, startY + 5, 40 + textWidth, startY + 5);
    doc.setFontSize(12);
    doc.text('Observaciones:', 40, observationLabel); // axis x, axis y
    doc.text(observationObj ? observationObj : '-', 40, observationText);
  }

  function showNumericalTool(doc, data, head, startY) {
    const result = data.rows.map((p) => [p.name, p.attempts, p.success, p.fail, p.percentage]);
    let content = {
      startY: startY,
      head: head,
      body: result,
      styles: {
        fontSize: 11,
        halign: 'center'
      },
      headStyles: { fillColor: ['#1976d2', 0, 0] },
      theme: 'grid',
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 100 },
        2: { cellWidth: 100 },
        3: { cellWidth: 100 },
        4: { cellWidth: 100 }
      }
    };
    doc.autoTable(content);
  }

  return (
    <Modal show={showModal.details} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Detalle de la sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '14px', fontWeight: 'bold', color: '#66696b' }}>
        <Accordion className='pb-4 mt-2'>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0' style={{ textAlign: 'center', cursor: 'pointer', color: '#6c757d', fontWeight: 'bold', fontSize: '15px' }}>
              Información del alumno
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <div className='row pb-2'>
                  <div className='col-md-3 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Alumno: </label> <br />
                    {obj.fullName}
                  </div>
                  <div className='col-md-3 my-2'>
                    <label style={{ fontWeight: 'bold' }}>Fecha de la sesión: </label> <br />
                    {date}
                  </div>
                  {obj.evaluation && (
                    <div className='col-md-3 my-2'>
                      <label style={{ fontWeight: 'bold' }}>Evaluación: </label> <br />
                      {obj.evaluation}
                    </div>
                  )}
                  {obj.attention && (
                    <div className='col-md-3 my-2'>
                      <label style={{ fontWeight: 'bold' }}>Atención: </label> <br />
                      {obj.attention}
                    </div>
                  )}
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {obj.alphabetical.observation && (
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
        )}
        {obj.numerical.statistics.avgTime && (
          <Accordion className='pb-4'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0' style={{ textAlign: 'center', cursor: 'pointer', color: '#6c757d', fontWeight: 'bold', fontSize: '15px' }}>
                Herramienta numérica y lógica
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  {aritmeticTable.show && <Table data={aritmeticTable} paging={true} />}
                  {matchesTable.show && <Table data={matchesTable} paging={true} />}
                  <div className='row pb-2'>
                    {obj.numerical.observation && (
                      <div className='col-md-8 my-2 text-justify'>
                        <label style={{ fontWeight: 'bold' }}>Observaciones realizadas: </label> <br />
                        {obj.numerical.observation}
                      </div>
                    )}
                    <div className='col-md-4 my-2'>
                      <label style={{ fontWeight: 'bold' }}>Tiempo promedio: </label> <br />
                      {avgTime}
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}
        {obj.observation && (
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
        )}
        <div className='pb-4 text-center'>
          <MDBBtn onClick={exportPDF} size='lg' className='py-2 mr-0 shadow-none btnOption blue darken-2' title='Descargar PDF'>
            <span className='mr-2'>Descargar</span>
            <i className='fas fa-download'></i>
          </MDBBtn>
        </div>
        <Modal.Footer>
          <Cancel onClick={handleClose} title='Cancelar' />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default HistoricalSessionDetails;
