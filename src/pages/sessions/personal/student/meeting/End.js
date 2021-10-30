import React, { useState } from 'react';
import Submit from '../../../../../components/html/button/Submit';
import { BASE_URL } from '../../../../../config/environment';
import Body from './Body';
import { useHistory } from 'react-router-dom';
import postResponseApi from '../../../../../utils/services/post/postResponseApi';
import showAlert from '../../../../../utils/commons/showAlert';

const End = ({ handleChange, session, sessionId }) => {
  const [sessionEvaluation, setSessionEvaluation] = useState();
  let history = useHistory();

  function setEvaluation(title) {
    setSessionEvaluation(title);
  }

  async function handleSubmit() {
    const values = { sessionEvaluation: sessionEvaluation, narrative: session.generalComments };
    await postResponseApi(`${BASE_URL}/session/assessment/student/` + sessionId, values);
    await showAlert('Sesión finalizada', 'La sesión con el profesional ha finalizado', 'success');
    history.push(`/landing`);
  }

  return (
    <React.Fragment>
      <div className='d-flex justify-content-center align-items-center' style={{ marginBottom: '25px', marginTop: '25px', marginLeft: '20px', marginRight: '20px' }}>
        <Body title='Excelente' colorStyle='#33a74d ' colorClass='green' iconItem='far fa-smile-beam' setEvaluation={setEvaluation} />
        <Body title='Regular' colorStyle='#ffc107db' colorClass='yellow' iconItem='far fa-tired' setEvaluation={setEvaluation} />
        <Body title='Mal' colorStyle='rgb(211 47 47 / 95%)' colorClass='red' iconItem='far fa-angry' setEvaluation={setEvaluation} />
      </div>
      <div className='row mb-2'>
        <div className='col-md-12 my-2'>
          <label>Comentarios de la sesión</label>
          <textarea id='generalComments' rows='4' onChange={handleChange} value={session.generalComments} type='text' className='form-control' />
        </div>
      </div>
      <div className='row align-items-center d-flex flex-column-reverse flex-md-row'>
        <div className='col-md-12 d-flex justify-content-center justify-content-md-end my-2'>
          <Submit onClick={handleSubmit} title='Finalizar' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default End;
