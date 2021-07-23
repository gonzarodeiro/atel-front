import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './menu/route';

const Index = () => {
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
  }, []);

  return (
    <div className='dashboard'>
      <div className='content'>
        <div className='section-title'>
          <h1 style={{ fontSize: '22px', fontWeight: '600', color: 'rgb(44 62 80 / 93%)' }}>Hola, {sessionStorage.getItem('name')}</h1>
          <div className='dates' style={{ fontSize: '17.2px', marginTop: '2px', marginRight: '3px', marginBottom: '30px', fontWeight: '600', color: 'rgb(44 62 80 / 93%)' }}>
            <div className='actual-date'>Próxima sesión: 24/07/2021 16:00 hs</div>
          </div>
        </div>
        <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid rgb(206, 203, 203)' }}>
          <h2 className='text-center' style={{ margin: '52px', fontSize: '22px', marginBottom: '55px', fontWeight: '600', color: '#34495ee0' }}>
            ¿Que operación quiere realizar?
          </h2>
          <div data-test='row justify-content-md-center' className='row justify-content-md-center' style={{ marginBottom: '40px', marginLeft: '20px', marginRight: '20px' }}>
            <Card title='Sesiones' module='sessions' colorStyle='#ec407a' colorClass='violet' description='Generar nuevas reuniones' iconItem='fas fa-video' />
            {/* <Card title='Alumnos' module='students' colorStyle='rgb(50 174 220)' colorClass='info' description='Ver más información' iconItem='fas fa-user-friends' /> */}
            <Card title='Agenda' module='schedule' colorStyle='#ff7043' colorClass='orange' description='Consulta de sesiones' iconItem='fas fa-list' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
