import React from 'react';
import { useHistory } from 'react-router-dom';
import Submit from '../../../../../components/html/button/Submit';
import Dropdownlist from '../../../../../components/html/Dropdownlist';
import { dlEvaluationSession } from '../../../../../utils/dropdownlists';
import showAlert from '../../../../../utils/commons/showAlert';
import status from '../../../../../utils/enums/sessionStatus';
import postResponseApi from '../../../../../utils/services/post/postResponseApi';
import cleanObject from '../../../../../utils/commons/cleanObject';
import { BASE_URL } from '../../../../../config/environment';

const End = ({ handleChange, session, props }) => {
  let history = useHistory();

  async function handleSubmit() {
    const filters = createFilters();
    await postResponseApi(`${BASE_URL}/session/finish`, filters);
    await showAlert('Sesión Finalizada', `Se ha finalizado la sesión con ${props.location.state.userName} `, 'success');
    history.push(`/home`);
  }

  function createFilters() {
    const values = {
      id_session: props.location.state.sessionId,
      generalComments: session.generalComments,
      status: status.Finished,
      attention: parseInt(session.attention),
      evaluation: parseInt(session.evaluation)
    };
    cleanObject(values);
    return values;
  }

  return (
    <React.Fragment>
      <div className='mt-3' data-test='col'>
        <label className='mb-2'>Datos de la sesión</label>
      </div>
      <div data-test='container' className='container-fluid section mb-3 border p-2'>
        <div className='text-center' style={{ marginTop: '2px', marginBottom: '-5px' }}>
          <label>Duración: </label> 15 minutos
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 my-2'>
          <Dropdownlist title='Valoración de la sesión' id='evaluation' handleChange={handleChange} value={session.evaluation} dropdownlist={dlEvaluationSession} disabledValue={false} className='form-control' />
        </div>
        <div className='col-md-6 my-2'>
          <Dropdownlist title='Atención del alumno' id='attention' handleChange={handleChange} value={session.attention} dropdownlist={dlEvaluationSession} disabledValue={false} className='form-control' />
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-12 my-1'>
          <label>Observaciones generales</label>
          <textarea id='generalComments' rows='4' onChange={handleChange} value={session.generalComments} type='text' className='form-control' />
        </div>
      </div>
      <div className='row align-items-center d-flex flex-column-reverse flex-md-row'>
        <div className='col-md-12 d-flex justify-content-center justify-content-md-end my-2'>
          <Submit onClick={handleSubmit} title='Guardar' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default End;
