import React, { useState } from 'react';
import { MDBBtn } from 'mdbreact';
import Jitsi from '../../../../../components/Jitsi';
import finishSession from '../finishSession';
import tools from '../../../../../utils/enums/tools';
import Activity from '../../../../../components/Activity/Logical/professionalLogic';
import Settings, { modalResults } from '../../../../../components/Activity/Logical/components/Settings';

const Numerical = ({ props, handleChange, session, showTools, showMeeting }) => {
  const [showSettings, setShowSettings] = useState(false);

  function redirectTool(tool) {
    showTools({ [tool]: true });
  }

  function redirectEnd() {
    showTools({ numerical: false });
    showMeeting({ end: true });
  }

  function restart() {}

  function handleOpenSettings() {
    setShowSettings(true);
  }
  function handleCloseSettings(mr, settings) {
    if (mr === modalResults.OK) {
      console.log(settings);
      console.log(settings.containers);
    }
    setShowSettings(false);
  }

  return (
    <React.Fragment>
      <div className='row'>
        <div className='pb-3 mt-2 col-md-8'>
          <Activity />
        </div>
        <div className='col-md-4' style={{ marginTop: '3px' }}>
          <div data-test='col'>
            <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Cámara del alumno
            </label>
          </div>
          {props.location.state && <Jitsi roomId={props.location.state.roomId + '-' + props.location.state.sessionId} userName={sessionStorage.getItem('name')} height='200px' />}
          <div data-test='col' style={{ paddingTop: '12px' }}>
            <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Acciones
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-12 mt-1 mb-1'>
                <MDBBtn onClick={handleOpenSettings} size='lg' className='py-2 grey darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Configurar</span>
                </MDBBtn>
              </div>
              <div className='col-md-12 mt-1 mb-1'>
                <MDBBtn onClick={restart} size='lg' className='py-2 green darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Reiniciar</span>
                </MDBBtn>
              </div>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool(tools.alphabetical)} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Herramienta Alfabética</span>
                </MDBBtn>
              </div>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool(tools.pictogram)} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Pictogramas</span>
                </MDBBtn>
              </div>
            </div>
          </div>
          <div data-test='col'>
            <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Fin de la sesión
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='col-md-12 mb-1'>
              <MDBBtn onClick={() => finishSession(redirectEnd)} size='lg' className='py-2 shadow-none btnOption btnCancel w-100 ml-0'>
                <span>Finalizar</span>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-12 my-1'>
          <label>Observaciones de la actividad</label>
          <textarea id='numericalComments' rows='3' onChange={handleChange} value={session.numericalComments} type='text' className='form-control' />
        </div>
      </div>
      <Settings show={showSettings} onClose={handleCloseSettings} />
    </React.Fragment>
  );
};

export default Numerical;
