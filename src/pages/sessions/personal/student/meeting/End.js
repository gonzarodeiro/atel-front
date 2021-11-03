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
    history.push(`/home`);
  }

  return (
    <React.Fragment>
      <div className='col-md-11 mt-1' style={{ marginLeft: '33px', fontSize: '15px' }}>
        <label>¿Cómo te sentiste hoy?</label>
      </div>
      <div className='d-flex justify-content-center align-items-center' style={{ marginBottom: '19px', marginLeft: '36px', marginRight: '36px', marginTop: '12px' }}>
        <Body setEvaluation={setEvaluation} />
      </div>
      <div className='row mb-2 justify-content-center'>
        <div className='col-md-11 my-2' style={{ fontSize: '14px' }}>
          <label>Comentarios de la familia</label>
          <textarea id='generalComments' rows='4' onChange={handleChange} value={session.generalComments} type='text' className='form-control' />
        </div>
      </div>
      <div className='row align-items-center d-flex flex-column-reverse flex-md-row'>
        <div className='col-md-11 d-flex my-2 justify-content-md-end' style={{ marginLeft: '48px' }}>
          <Submit onClick={handleSubmit} title='Finalizar' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default End;
