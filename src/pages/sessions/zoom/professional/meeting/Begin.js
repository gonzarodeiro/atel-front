import React, { useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import Notification from '../../../../../components/html/Notification';
import finishSession from '../../../personal/professional/finishSession';
import Zoom from '../../../../../components/Zoom';
import handleJitsiResize from '../../../handleJitsiResize';

const Begin = ({ props, handleChange, modal, session, showMeeting, copyClipboard, onJitsiLayout, setEndTimeSession }) => {
  useEffect(() => {
    handleJitsiResize('#begin-jitsi', onJitsiLayout);
    const listener = window.addEventListener('resize', () => handleJitsiResize('#begin-jitsi', onJitsiLayout));
    return () => window.removeEventListener('resize', listener);
  }, []);

  function redirectEnd() {
    setEndTimeSession(new Date());
    showMeeting({ begin: false, end: true });
  }

  return (
    <React.Fragment>
      <div className='row'>
        <div className='pb-2 col-md-6 mt-3 mb-2'>{props.location.state && <Zoom roomZoom={props.location.state.roomZoom} height={'400px'} width={'550px'} />}</div>
        <div id='begin-jitsi' className='pb-2 col-md-6 mt-3 mb-2' style={{ height: '400px' }}></div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-6 my-1'>
          <label>Observaciones generales</label>
          <textarea id='generalComments' rows='3' onChange={handleChange} value={session.generalComments} type='text' className='form-control' />
        </div>
        <div className='col-md-3 my-1 mt-2'>
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
        </div>
        <div className='col-md-3 my-1 mt-2'>
          <div data-test='col'>
            <label className='mb-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Fin de la sesión
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-12 mt-1'>
                <MDBBtn onClick={() => finishSession(redirectEnd)} size='lg' className='py-2 shadow-none btnOption btnCancel w-100 ml-0 mt-0'>
                  <span>Finalizar</span>
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal.notification && <Notification title='Link copiado' message='Debe compartirlo con el alumno' />}
    </React.Fragment>
  );
};

export default Begin;
