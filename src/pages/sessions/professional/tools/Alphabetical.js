import React, { useState } from 'react';
import { MDBBtn } from 'mdbreact';
import Jitsi from '../../../../components/Jitsi';
import Activity from '../../../../components/Activity/Alphabetical/professionalLogic';
import finishSession from '../finishSession';
import tools from '../../../../utils/enums/tools';
import { clientEvents, sendMessage } from '../../../../utils/socketManager';
import { v4 as uuidv4 } from 'uuid';
import imgCherry from '../../../../components/Activity/Alphabetical/images/fruits/fruit_cherry.png';
import imgGrape from '../../../../components/Activity/Alphabetical/images/fruits/fruit_grape.png';
import imgApple from '../../../../components/Activity/Alphabetical/images/fruits/fruit_apple.png';
import imgLemon from '../../../../components/Activity/Alphabetical/images/fruits/fruit_lemon.png';
import imgBanana from '../../../../components/Activity/Alphabetical/images/fruits/fruit_banana.png';
import imgCat from '../../../../components/Activity/Alphabetical/images/animals/cat.png';
import imgGiraffe from '../../../../components/Activity/Alphabetical/images/animals/giraffe.png';
import imgLion from '../../../../components/Activity/Alphabetical/images/animals/lion.png';
import imgDog from '../../../../components/Activity/Alphabetical/images/animals/dog.png';
import imgElephant from '../../../../components/Activity/Alphabetical/images/animals/elephant.png';
import voiceApple from '../../../../components/Activity/Alphabetical/audio/fruits/voice-manzana.mp3';
import voiceBanana from '../../../../components/Activity/Alphabetical/audio/fruits/voice-banana.mp3';
import voiceCherry from '../../../../components/Activity/Alphabetical/audio/fruits/voice-cereza.mp3';
import voiceGrape from '../../../../components/Activity/Alphabetical/audio/fruits/voice-uva.mp3';
import voiceLemon from '../../../../components/Activity/Alphabetical/audio/fruits/voice-limon.mp3';
import voiceDog from '../../../../components/Activity/Alphabetical/audio/animals/voice-dog.mp3';
import voiceCat from '../../../../components/Activity/Alphabetical/audio/animals/voice-cat.mp3';
import voiceGiraffe from '../../../../components/Activity/Alphabetical/audio/animals/voice-giraffe.mp3';
import voiceLion from '../../../../components/Activity/Alphabetical/audio/animals/voice-lion.mp3';
import voiceElephant from '../../../../components/Activity/Alphabetical/audio/animals/voice-elephant.mp3';

const Alphabetical = ({ props, handleChange, session, showTools, showMeeting }) => {
  function redirectTool(tool) {
    showTools({ [tool]: true });
  }

  function redirectEnd() {
    showTools({ alphabetical: false });
    showMeeting({ end: true });
  }

  function restart() {
    sendMessage(clientEvents.resetActivity);
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
              <div className='col-md-12'>
                <MDBBtn onClick={() => restart()} size='lg' className='py-2 green darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Reiniciar actividad</span>
                </MDBBtn>
              </div>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool(tools.numerical)} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Herramienta Númerica</span>
                </MDBBtn>
              </div>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool('pictogram')} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
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
          <textarea id='alphabeticalComments' rows='3' onChange={handleChange} value={session.alphabeticalComments} type='text' className='form-control' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Alphabetical;
