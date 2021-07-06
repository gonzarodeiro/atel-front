import React, { useState } from 'react';
import Jitsi from '../../../../components/Jitsi';
import Activity from '../../../../components/Activity/Alphabetical/index';
import { v4 as uuidv4 } from 'uuid';
import imgCherry from '../../../../components/Activity/Alphabetical/images/fruits/fruit_cherry.png';
import imgGrape from '../../../../components/Activity/Alphabetical/images/fruits/fruit_grape.png';
import imgApple from '../../../../components/Activity/Alphabetical/images/fruits/fruit_apple.png';
import imgLemon from '../../../../components/Activity/Alphabetical/images/fruits/fruit_lemon.png';
import imgBanana from '../../../../components/Activity/Alphabetical/images/fruits/fruit_banana.png';
import voiceApple from '../../../../components/Activity/Alphabetical/audio/fruits/voice-manzana.mp3';
import voiceBanana from '../../../../components/Activity/Alphabetical/audio/fruits/voice-banana.mp3';
import voiceCherry from '../../../../components/Activity/Alphabetical/audio/fruits/voice-cereza.mp3';
import voiceGrape from '../../../../components/Activity/Alphabetical/audio/fruits/voice-uva.mp3';
import voiceLemon from '../../../../components/Activity/Alphabetical/audio/fruits/voice-limon.mp3';

const Alphabetical = () => {
  const [activityData] = useState({
    elements: [
      {
        id: uuidv4(),
        name: 'CEREZA',
        src: imgCherry,
        voice: voiceCherry,
        width: 90,
        height: 85,
        draggable: true,
        matched: false
      },
      {
        id: uuidv4(),
        name: 'UVA',
        src: imgGrape,
        voice: voiceGrape,
        width: 90,
        height: 85,
        draggable: true,
        matched: false
      },
      {
        id: uuidv4(),
        name: 'MANZANA',
        src: imgApple,
        voice: voiceApple,
        width: 90,
        height: 85,
        draggable: true,
        matched: false
      },
      {
        id: uuidv4(),
        name: 'LIMÓN',
        src: imgLemon,
        voice: voiceLemon,
        width: 90,
        height: 85,
        draggable: true,
        matched: false
      },
      {
        id: uuidv4(),
        name: 'BANANA',
        src: imgBanana,
        voice: voiceBanana,
        width: 90,
        height: 85,
        draggable: true,
        matched: false
      }
    ],
    colors: ['#DE8971', '#7B6079', '#A7D0CD', '#FFE9D6']
  });

  return (
    <React.Fragment>
      <div className='row'>
        <div className='pb-3 mt-2 col-md-8'>
          <Activity data={activityData} isProfessional={false} />
        </div>
        <div className='col-md-4' style={{ marginTop: '3px' }}>
          <div data-test='col'>
            <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Cámara del profesional
            </label>
          </div>
          <Jitsi roomId={'LucasGomez-123'} userName={'qweqweq'} height='200px' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Alphabetical;
