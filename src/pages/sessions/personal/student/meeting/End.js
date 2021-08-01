import React from 'react';
import Submit from '../../../../../components/html/button/Submit';
import Body from './Body';
import { useHistory } from 'react-router-dom';

const End = ({ handleChange, session }) => {
  let history = useHistory();
  return (
    <React.Fragment>
      <div className='d-flex justify-content-center align-items-center' style={{ marginBottom: '25px', marginTop: '25px', marginLeft: '20px', marginRight: '20px' }}>
        <Body title='Excelente' colorStyle='#33a74d ' colorClass='green' iconItem='far fa-smile-beam' />
        <Body title='Regular' colorStyle='#ffc107db' colorClass='yellow' iconItem='far fa-tired' />
        <Body title='Mal' colorStyle='rgb(211 47 47 / 95%)' colorClass='red' iconItem='far fa-angry' />
      </div>
      <div className='row mb-2'>
        <div className='col-md-12 my-2'>
          <label>Comentarios de la sesión</label>
          <textarea id='generalComments' rows='4' onChange={handleChange} value={session.generalComments} type='text' className='form-control' />
        </div>
      </div>
      <div className='row align-items-center d-flex flex-column-reverse flex-md-row'>
        <div className='col-md-12 d-flex justify-content-center justify-content-md-end my-2'>
          <Submit onClick={() => history.push(`/home`)} title='Salir' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default End;
