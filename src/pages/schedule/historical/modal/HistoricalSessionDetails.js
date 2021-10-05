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
    doc.setFontSize(14);
    doc.text('Detalles de la sesión', 40, 40);
    const textWidth = doc.getTextWidth('Detalles de la sesión');
    doc.line(40, 45, 40 + textWidth, 45);
    createHeader(doc, obj);
    showInfoTools(doc);
    doc.save(obj.fullName + '.pdf');
  }

  function createHeader(doc, obj) {
    doc.setFontSize(12);
    doc.text('Alumno:', 40, 75); // axis x, axis y
    doc.text(obj.fullName, 87, 75);
    doc.text('Fecha:', 180, 75);
    doc.text(date, 220, 75);
    doc.text('Evaluación:', 332, 75);
    doc.text(obj.evaluation ? obj.evaluation : '-', 398, 75);
    doc.text('Atención:', 475, 75);
    doc.text(obj.attention ? obj.attention : '-', 528, 75);
    doc.text('Observaciones generales:', 40, 105);
    doc.text(40, 124, obj.observation ? obj.observation : '-', { maxWidth: 520, align: 'justify' });
  }

  function showInfoTools(doc) {
    if (obj.alphabetical) {
      showAlphabeticalHeader(doc);
      doc.addPage();
    }

    if (obj.numerical) {
      showNumericalHeader(doc);
      // showNumericalTool(doc, aritmeticTable, ['Operación', 'Intentos', 'Aciertos', 'Errores', 'Efectividad']);
      // showNumericalTool(doc, matchesTable, ['Elemento', 'Intentos', 'Aciertos', 'Errores', 'Efectividad']);
    }
  }

  function showAlphabeticalHeader(doc) {
    const title = 'Herramienta alfabética';
    doc.setFontSize(14);
    doc.text(title, 40, 180);
    const textWidth = doc.getTextWidth(title);
    doc.line(40, 185, 40 + textWidth, 185);
    doc.setFontSize(12);
    doc.text('Observaciones:', 40, 205); // axis x, axis y
    doc.text(obj.alphabetical.observation ? obj.alphabetical.observation : '-', 40, 225);

    // const headers = [['Campo', 'Nombre', 'Valor']];
    // const result = obj.alphabetical.map((p) => [p.name, p.attempts, p.success, p.fail, p.percentage]);
    // let content = {
    //   startY: 150,
    //   head: headers,
    //   body: result,
    //   headStyles: { fillColor: ['#ee4040', 0, 0] },
    //   theme: 'grid',
    //   columnStyles: {
    //     0: { cellWidth: 65 },
    //     1: { cellWidth: 185 },
    //     2: { cellWidth: 280 }
    //   }
    // };
    // doc.autoTable(content);
  }

  function showNumericalHeader(doc, startAritmetic) {
    const title = 'Herramienta numérica y lógica';
    doc.setFontSize(14);
    doc.text(title, 40, startAritmetic - 7);
    const textWidth = doc.getTextWidth(title);
    doc.line(40, startAritmetic, 40 + textWidth, startAritmetic);
    doc.setFontSize(12);
    doc.text('Observaciones:', 40, startAritmetic + 23); // axis x, axis y
    doc.text(obj.alphabetical.observation ? obj.alphabetical.observation : '-', 40, startAritmetic + 40);
  }

  // function showNumericalTool(doc, data, head, startY) {
  //   const result = data.map((p) => [p.name, p.attempts, p.success, p.fail, p.percentage]);
  //   let content = {
  //     startY: startY,
  //     head: head,
  //     body: result,
  //     headStyles: { fillColor: ['#ee4040', 0, 0] },
  //     theme: 'grid',
  //     columnStyles: {
  //       0: { cellWidth: 65 },
  //       1: { cellWidth: 185 },
  //       2: { cellWidth: 280 },
  //       3: { cellWidth: 350 },
  //       4: { cellWidth: 400 }
  //     }
  //   };
  //   doc.autoTable(content);
  // }

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
