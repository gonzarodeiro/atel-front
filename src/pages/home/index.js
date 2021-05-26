import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import 'moment/locale/es';

const Index = () => {
  let history = useHistory();
  const [localDate, setLocalDate] = useState();
  const DATE_FORMAT = 'dddd D [de] MMMM [de] YYYY - HH:mm [hs]';

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    const date = moment(new Date()).format(DATE_FORMAT);
    setLocalDate(date.charAt(0).toUpperCase() + date.slice(1));
  }, []);

  return (
    <div className='dashboard'>
      <div className='content'>
        <div className='section-title'>
          <h1 style={{ fontSize: '23px', fontWeight: '600' }}>Hola, {sessionStorage.getItem('name')}</h1>
          <div className='dates' style={{ fontSize: '15px', marginBottom: '30px', fontWeight: '600' }}>
            <div className='actual-date'>{localDate}</div>
          </div>
        </div>
        <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid rgb(206, 203, 203)' }}>
          <h2 className='text-muted text-center' style={{ margin: '52px', fontSize: '22px', marginBottom: '55px', fontWeight: '600' }}>
            ¿Que operación quiere realizar?
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Index;
