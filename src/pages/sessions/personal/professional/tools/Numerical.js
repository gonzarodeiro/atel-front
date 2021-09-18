import React, { useState, useLayoutEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import finishSession from '../finishSession';
import tools from '../../../../../utils/enums/tools';
import Activity from '../../../../../components/Activity/Logical/professionalLogic';
import Settings, { modalResults, initialSettings } from '../../../../../components/Activity/Logical/components/Settings';
import { clientEvents, sendMessage } from '../../../../../utils/socketManager';
import { getDataFromSettings } from '../../../../../components/Activity/Logical/commons/data';

const Numerical = ({ props, handleChange, session, showTools, showMeeting, setCelebrationVisible, onJitsiLayout }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [validate, setValidate] = useState(false);

  useLayoutEffect(() => {
    handleResize();
    const listener = window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', listener);
  }, []);

  function handleResize() {
    const htmlElement = document.querySelector('#numerical-jitsi');
    if (!htmlElement) return;
    const rect = htmlElement.getBoundingClientRect();
    onJitsiLayout({
      width: htmlElement.offsetWidth,
      height: htmlElement.offsetHeight,
      top: htmlElement.offsetTop,
      left: htmlElement.offsetLeft,
      rect: rect
    });
  }

  function redirectTool(tool) {
    showTools({ [tool]: true });
  }

  function redirectEnd() {
    showTools({ numerical: false });
    showMeeting({ end: true });
    setCelebrationVisible(false);
  }

  function restart() {
    const initialData = getDataFromSettings(initialSettings);
    sendMessage(clientEvents.setConfiguration, initialData);
  }

  function handleOpenSettings() {
    setShowSettings(true);
  }

  function handleCloseSettings(mr, settings) {
    if (mr === modalResults.OK) {
      const newData = getDataFromSettings(settings);
      sendMessage(clientEvents.setConfiguration, newData);
    }
    setShowSettings(false);
  }

  function handleCheckResults() {
    setValidate(!validate);
  }

  function beginSession() {
    sendMessage(clientEvents.beginSession);
    showTools({ numerical: false });
    showMeeting({ begin: true });
  }

  return (
    <React.Fragment>
      <div className='row'>
        <div className='pb-3 mt-2 col-md-8'>
          <Activity validate={validate} />
        </div>
        <div className='col-md-4' style={{ marginTop: '3px' }}>
          <div data-test='col'>
            <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Cámara del alumno
            </label>
          </div>
          <div id='numerical-jitsi' className='pb-3 mt-2 col-md-12' style={{ height: '200px' }}></div>
          <div data-test='col' style={{ paddingTop: '12px' }}>
            <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Acciones
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-6 mt-1 mb-1'>
                <MDBBtn onClick={handleCheckResults} size='lg' className='py-2 peru darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Validar</span>
                </MDBBtn>
              </div>
              <div className='col-md-6 mt-1 mb-1'>
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
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-8 my-1'>
          <label>Observaciones de la actividad</label>
          <textarea id='numericalComments' rows='3' onChange={handleChange} value={session.numericalComments} type='text' className='form-control' />
        </div>
        <div className='col-md-4 my-1'>
          <div data-test='col'>
            <label className='mb-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Información de la sesión
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-6'>
                <MDBBtn onClick={beginSession} size='lg' className='py-2 shadow-none btnOption btnCancel w-100 ml-0'>
                  <span>Comienzo</span>
                </MDBBtn>
              </div>
              <div className='col-md-6'>
                <MDBBtn onClick={() => finishSession(redirectEnd)} size='lg' className='py-2 shadow-none btnOption btnCancel w-100 ml-0'>
                  <span>Finalizar</span>
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Settings show={showSettings} onClose={handleCloseSettings} />
    </React.Fragment>
  );
};

export default Numerical;
