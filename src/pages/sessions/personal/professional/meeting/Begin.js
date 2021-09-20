import React, { useLayoutEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import Notification from '../../../../../components/html/Notification';
import { clientEvents, sendMessage } from '../../../../../utils/socketManager';
import tools from '../../../../../utils/enums/tools';
import finishSession from '../finishSession';
import handleJitsiResize from '../../../handleJitsiResize';

const Begin = ({ props, handleChange, modal, session, showTools, showMeeting, copyClipboard, setCelebrationVisible, onJitsiLayout }) => {
  useLayoutEffect(() => {    
    handleJitsiResize("#begin-jitsi", onJitsiLayout);    
    const listener = window.addEventListener('resize', () => handleJitsiResize("#begin-jitsi", onJitsiLayout));    
    return () =>{ window.removeEventListener('resize', listener)};
  }, []);


  function getMessageByTool(tool) {
    let mapToolToEvent = {
      [tools.alphabetical]: clientEvents.initAlphabetical,
      [tools.numerical]: clientEvents.initNumerical,
      [tools.pictograms]: clientEvents.initPictograms
    };
    return mapToolToEvent[tool];
  }

  function redirectTool(tool) {
    sendMessage(getMessageByTool(tool));
    showMeeting({ begin: false });
    showTools({ [tool]: true });
  }

  function redirectEnd() {
    showMeeting({ begin: false, end: true });
    onJitsiLayout();
    setCelebrationVisible(false);
  }

  return (
    <React.Fragment>
      <div className='row'>
        <div id='begin-jitsi' className='pb-3 mt-2 col-md-8' />
        <div className='col-md-4' style={{ marginTop: '4.5px' }}>
          <div data-test='col'>
            <label className='mb-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Compartir link con el alumno
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <MDBBtn onClick={copyClipboard} size='lg' className='py-2 red darken-1 shadow-none text-white btnOption w-100' style={{ marginLeft: '15px', marginRight: '15px' }}>
                <span>Link de la reunion</span>
              </MDBBtn>
            </div>
          </div>
          <div data-test='col'>
            <label className='mb-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Herramientas didácticas
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool(tools.numerical)} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Númerica y lógica</span>
                </MDBBtn>
              </div>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool(tools.alphabetical)} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Alfabetización</span>
                </MDBBtn>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool(tools.pictogram)} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Pictogramas</span>
                </MDBBtn>
              </div>
            </div>
          </div>
          <div data-test='col'>
            <label className='mb-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Fin de la sesión
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-12 mt-1 mb-1'>
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
          <label>Observaciones generales</label>
          <textarea id='generalComments' rows='3' onChange={handleChange} value={session.generalComments} type='text' className='form-control' />
        </div>
      </div>
      {modal.notification && <Notification title='Link copiado' message='Debe compartirlo con el alumno' />}
    </React.Fragment>
  );
};

export default Begin;
