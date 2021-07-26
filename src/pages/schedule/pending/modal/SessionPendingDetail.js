import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Cancel from '../../../../components/html/button/Cancel';
import Submit from '../../../../components/html/button/Submit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import datepicker from '../../../../utils/commons/datepicker';
import Loading from '../../../../components/Loading';
import patchApi from '../../../../utils/services/patch/patchApi';
import addDays from '../../../../utils/commons/addDays';
import showAlert from '../../../../utils/commons/showAlert';
registerLocale('es', datepicker);

const SessionPendingDetail = ({ showModal, handleClose, idSession, userName, sessionDate }) => {
  const [session, setSession] = useState({ date: '' });
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setSession({ date: addDays(sessionDate) });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const values = { start_datetime: session.date };
    await patchApi('https://atel-back-stg.herokuapp.com/session', values, idSession);
    setLoading(false);
    await showAlert('Sesión modificada', `Se ha modificado la sesión con ${userName}`, 'success');
    history.push({ pathname: 'home' });
  };

  function handleChange(date) {
    setSession({ ...session, date: date });
  }

  return (
    <Modal show={showModal.details} onHide={() => handleClose('details')} size='lg' aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton style={{ background: '#1565c0', padding: '8px 18px', color: 'white' }}>
        <Modal.Title style={{ fontSize: '19px' }}>Detalle de la sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: '14px', fontWeight: 'bold', color: '#66696b' }}>
        {loading && (
          <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
            <Loading />
          </div>
        )}
        <div className='row mb-4'>
          <div className='col-md-12 my-1'>
            <label>Fecha y horario</label>
            <DatePicker id='date' showTimeSelect timeFormat='HH:mm' timeIntervals={30} minDate={new Date()} dateFormat='dd/MM/yyyy - hh:mm aa' selected={session.date} todayButton='Hoy' onChange={(date) => handleChange(date)} value={session.date} className='form-control' timeCaption='Hora' />
          </div>
        </div>
        <Modal.Footer>
          <Cancel onClick={() => handleClose('details')} title='Cancelar' />
          <Submit onClick={handleSubmit} title='Modificar' />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default SessionPendingDetail;
