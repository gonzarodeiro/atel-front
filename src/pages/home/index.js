import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './menu/route';
import { BASE_URL } from '../../config/environment';
import getResponseById from '../../utils/services/get/getById/index';
import showAlert from '../../utils/commons/showAlert';
import convertDate from '../../utils/commons/convertDate';
import convertDateTime from '../../utils/commons/convertDateTime';
import patchApi from '../../utils/services/patch/patchResponseApi';
import status from '../../utils/enums/sessionStatus';

const Index = () => {
  const [nextSession, setNextSession] = useState();
  const [session, setSession] = useState();
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else getNextSessions();
  }, []);

  async function getNextSessions() {
    let result = await getResponseById(`${BASE_URL}/session/nexts/professional`, parseInt(sessionStorage.getItem('idProfessional')));
    if (result[0].length > 0) {
      const date = convertDateTime(new Date(result[0][0].startDatetime));
      setSession(result[0][0]);
      setNextSession(`Próxima sesión: ${date} hs`);
    } else setNextSession(`No hay próximas sesiones`);
  }

  async function loadSession() {
    if (session.allowEnterRoom) {
      await patchApi(`${BASE_URL}/session/status`, session.id);
      redirectPages();
    } else showAlert('Error', 'La sesión aún no ha comenzado', 'error');
  }

  function redirectPages() {
    const date = convertDate(new Date());
    if (session.type === 'Sesión de inclusión') {
      history.push({
        pathname: 'zoom-session',
        state: { roomId: session.roomName, userName: session.roomName, date: date, sessionId: session.id, roomZoom: session.zoom + '-' + session.password + '-' + sessionStorage.getItem('name') }
      });
    } else {
      history.push({
        pathname: 'professionalSession',
        state: {
          id_student: session.idStudent,
          id_professional: session.idProfessional,
          status: status.Created,
          start_datetime: date,
          room_name: session.roomName,
          type: session.type
        }
      });
    }
  }

  return (
    <div className='dashboard'>
      <div className='content'>
        <div className='section-title'>
          <h1 style={{ fontSize: '22px', fontWeight: '600', color: 'rgb(44 62 80 / 93%)', marginLeft: '6px' }}>Hola, {sessionStorage.getItem('name')}</h1>
          <div className='dates' style={{ fontSize: '17.4px', marginTop: '2px', marginRight: '21px', cursor: 'pointer', marginBottom: '32px', fontWeight: '600', color: 'rgb(44 62 80 / 93%)' }}>
            <div className='actual-date' onClick={loadSession} title='Unirse'>
              <row className='row'>
                {nextSession}
                <i className='fas fa-sign-in-alt ml-2' style={{ fontSize: '21px', color: '#4685eeeb', marginTop: '3px' }} />
              </row>
            </div>
          </div>
        </div>
        <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid rgb(206, 203, 203)', borderRadius: '15px' }}>
          <h2 className='text-center' style={{ margin: '49px', fontSize: '22.4px', marginBottom: '54px', fontWeight: '600', color: '#34495ee0' }}>
            ¿Qué operación quiere realizar?
          </h2>
          <div data-test='row justify-content-md-center' className='row justify-content-md-center' style={{ marginBottom: '40px', marginLeft: '50px', marginRight: '50px' }}>
            <Card title='Sesiones' module='sessions' colorStyle='#ec407a' description='Crear nuevas reuniones' iconItem='fas fa-video' />
            <Card title='Alumnos' module='students' colorStyle='#ff7043' description='Ver más información' iconItem='fas fa-graduation-cap' />
            <Card title='Agenda' module='schedule' colorStyle='rgb(50 174 220)' description='Consulta de sesiones' iconItem='far fa-calendar-alt' />
          </div>
          <div data-test='row justify-content-md-center' className='row justify-content-md-center' style={{ marginBottom: '40px', marginLeft: '50px', marginRight: '50px' }}>
            <Card title='Materiales' module='materials' colorStyle='#303f9f' colorClass='indigo' description='Compartir sesiones' iconItem='fas fa-share-alt' />
            <Card title='Pictogramas' module='pictograms' colorStyle='#2aa446' colorClass='green' description='Configurar plantilla' iconItem='far fa-smile-beam' />
            <Card title='Profesional' module='professional' colorStyle='#cc0000c7' colorClass='red' description='Modificar datos' iconItem='fas fa-user-tie' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
