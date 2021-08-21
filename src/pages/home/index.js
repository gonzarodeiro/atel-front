import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './menu/route';
import { BASE_URL } from '../../config/environment';
import getResponseById from '../../utils/services/get/getById/index';
import showAlert from '../../utils/commons/showAlert';
import convertDate from '../../utils/commons/convertDate';
import convertDateTime from '../../utils/commons/convertDateTime';
import patchApi from '../../utils/services/patch/patchResponseApi';

const Index = () => {
  const [nextSession, setNextSession] = useState();
  const [session, setSession] = useState();
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else getNextSessions();
  }, []);

  async function getNextSessions() {
    let result = await getResponseById(`${BASE_URL}/session/nexts/professional`, sessionStorage.getItem('idProfessional'));
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
        state: { roomId: session.roomName, userName: session.roomName, date: date, sessionId: session.id }
      });
    }
  }

  return (
    <div className='dashboard'>
      <div className='content'>
        <div className='section-title'>
          <h1 style={{ fontSize: '22px', fontWeight: '600', color: 'rgb(44 62 80 / 93%)' }}>Hola, {sessionStorage.getItem('name')}</h1>
          <div className='dates' style={{ fontSize: '17.4px', marginTop: '2px', marginRight: '14px', cursor: 'pointer', marginBottom: '28px', fontWeight: '600', color: 'rgb(44 62 80 / 93%)' }}>
            <div className='actual-date' onClick={loadSession} title='Unirse'>
              <row className='row'>
                {nextSession}
                <i className='fas fa-sign-in-alt ml-2' style={{ fontSize: '22px', color: '#4685eeeb', marginTop: '3px' }} />
              </row>
            </div>
          </div>
        </div>
        <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid rgb(206, 203, 203)' }}>
          <h2 className='text-center' style={{ margin: '52px', fontSize: '22px', marginBottom: '55px', fontWeight: '600', color: '#34495ee0' }}>
            ¿Qué operación quiere realizar?
          </h2>
          <div data-test='row justify-content-md-center' className='row justify-content-md-center' style={{ marginBottom: '40px', marginLeft: '20px', marginRight: '20px' }}>
            <Card title='Sesiones' module='sessions' colorStyle='#ec407a' description='Generar nuevas reuniones' iconItem='fas fa-video' />
            {/* <Card title='Alumnos' module='students' colorStyle='rgb(50 174 220)' description='Ver más información' iconItem='fas fa-user-friends' /> */}
            <Card title='Agenda' module='schedule' colorStyle='#ff7043' description='Consulta de sesiones' iconItem='far fa-calendar-alt' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
