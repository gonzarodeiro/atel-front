import React, { useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import Activity from '../../../../../components/Activity/Alphabetical/professionalLogic';
import finishSession from '../finishSession';
import tools from '../../../../../utils/enums/tools';
import Notification from '../../../../../components/html/Notification';
import { clientEvents, sendMessage } from '../../../../../utils/socketManager';
import handleJitsiResize from '../../../handleJitsiResize';

const Alphabetical = ({ handleChange, session, showTools, showMeeting, modal, showModal, showWizard, setCelebrationVisible, onJitsiLayout, setEndTimeSession }) => {
  useEffect(() => {
    showModal({ notification: false });
    handleJitsiResize('#alphabetical-jitsi', onJitsiLayout);
    const listener = window.addEventListener('resize', () => handleJitsiResize('#alphabetical-jitsi', onJitsiLayout));
    showWizard(true);
    return () => window.removeEventListener('resize', listener);
  }, []);

  function redirectTool(tool) {
    sendMessage('init-' + tool);
    showTools({ [tool]: true });
  }

  function redirectEnd() {
    setEndTimeSession(new Date());
    showTools({ alphabetical: false });
    showMeeting({ end: true });
    onJitsiLayout();
    setCelebrationVisible(false);
  }

  function restart() {
    sendMessage(clientEvents.resetActivity);
  }

  function beginSession() {
    sendMessage(clientEvents.beginSession);
    showTools({ alphabetical: false });
    showMeeting({ begin: true });
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
          <div id='alphabetical-jitsi' className='pb-3 mt-2 col-md-12' style={{ height: '200px' }} />
          <div data-test='col' style={{ paddingTop: '12px' }}>
            <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Acciones
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-12'>
                <MDBBtn onClick={() => restart()} size='lg' className='py-2 green darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Reiniciar actividad</span>
                </MDBBtn>
              </div>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool(tools.numerical)} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Herramienta Numérica</span>
                </MDBBtn>
              </div>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool(tools.boxes)} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Completar palabras</span>
                </MDBBtn>
              </div>
            </div>
          </div>
          <div data-test='col'>
            <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Información de la sesión
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-6 mb-1'>
                <MDBBtn onClick={beginSession} size='lg' className='py-2 shadow-none btnOption btnCancel w-100 ml-0'>
                  <span>Comienzo</span>
                </MDBBtn>
              </div>
              <div className='col-md-6 mb-1'>
                <MDBBtn onClick={() => finishSession(redirectEnd)} size='lg' className='py-2 shadow-none btnOption btnCancel w-100 ml-0'>
                  <span>Finalizar</span>
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-12 my-1'>
          <label>Observaciones de la actividad</label>
          <textarea id='alphabeticalComments' rows='3' onChange={handleChange} value={session.alphabeticalComments} type='text' className='form-control' />
        </div>
      </div>
      {modal.notification && <Notification title='Link copiado' message='Debe compartirlo con el alumno' />}
    </React.Fragment>
  );
};

export default Alphabetical;
