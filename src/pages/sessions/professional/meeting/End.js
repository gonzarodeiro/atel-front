import React from 'react';
import { useHistory } from 'react-router-dom';
import Submit from '../../../../components/html/button/Submit';

const End = ({ handleChange, session }) => {
  let history = useHistory();

  return (
    <React.Fragment>
      <div className='row mb-2 mt-3'>
        <div className='col-md-4 my-1'>
          <label>Pictogramas</label>
          <textarea id='pictogramComments' rows='4' onChange={handleChange} value={session.pictogramComments} type='text' className='form-control' />
        </div>
        <div className='col-md-4 my-1'>
          <label>Numérica y lógica</label>
          <textarea id='numericalComments' rows='4' onChange={handleChange} value={session.numericalComments} type='text' className='form-control' />
        </div>
        <div className='col-md-4 my-1'>
          <label>Alfabetización</label>
          <textarea id='alphabeticalComments' rows='4' onChange={handleChange} value={session.alphabeticalComments} type='alphabeticalComments' className='form-control' />
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-12 my-1'>
          <label>Observaciones generales</label>
          <textarea id='generalComments' rows='4' onChange={handleChange} value={session.generalComments} type='text' className='form-control' />
        </div>
      </div>
      <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-2'>
        <div className='col-md-12 d-flex justify-content-center justify-content-md-end my-2'>
          <Submit onClick={() => history.push(`/home`)} title='Guardar' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default End;
