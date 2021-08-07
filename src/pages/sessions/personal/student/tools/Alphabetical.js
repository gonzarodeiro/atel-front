import React, { useState } from 'react';
import Jitsi from '../../../../../components/Jitsi';
import Activity from '../../../../../components/Activity/Alphabetical/studentLogic';
import { v4 as uuidv4 } from 'uuid';
import imgCherry from '../../../../../components/Activity/Alphabetical/images/fruits/fruit_cherry.png';
import imgGrape from '../../../../../components/Activity/Alphabetical/images/fruits/fruit_grape.png';
import imgApple from '../../../../../components/Activity/Alphabetical/images/fruits/fruit_apple.png';
import imgLemon from '../../../../../components/Activity/Alphabetical/images/fruits/fruit_lemon.png';
import imgBanana from '../../../../../components/Activity/Alphabetical/images/fruits/fruit_banana.png';
import imgCat from '../../../../../components/Activity/Alphabetical/images/animals/cat.png';
import imgGiraffe from '../../../../../components/Activity/Alphabetical/images/animals/giraffe.png';
import imgLion from '../../../../../components/Activity/Alphabetical/images/animals/lion.png';
import imgDog from '../../../../../components/Activity/Alphabetical/images/animals/dog.png';
import imgElephant from '../../../../../components/Activity/Alphabetical/images/animals/elephant.png';
import voiceApple from '../../../../../components/Activity/Alphabetical/audio/fruits/voice-manzana.mp3';
import voiceBanana from '../../../../../components/Activity/Alphabetical/audio/fruits/voice-banana.mp3';
import voiceCherry from '../../../../../components/Activity/Alphabetical/audio/fruits/voice-cereza.mp3';
import voiceGrape from '../../../../../components/Activity/Alphabetical/audio/fruits/voice-uva.mp3';
import voiceLemon from '../../../../../components/Activity/Alphabetical/audio/fruits/voice-limon.mp3';
import voiceDog from '../../../../../components/Activity/Alphabetical/audio/animals/voice-dog.mp3';
import voiceCat from '../../../../../components/Activity/Alphabetical/audio/animals/voice-cat.mp3';
import voiceGiraffe from '../../../../../components/Activity/Alphabetical/audio/animals/voice-giraffe.mp3';
import voiceLion from '../../../../../components/Activity/Alphabetical/audio/animals/voice-lion.mp3';
import voiceElephant from '../../../../../components/Activity/Alphabetical/audio/animals/voice-elephant.mp3';
// import { BASE_URL } from '../../../../../config/environment';
// TODO: Completar cuando este corregido el el endpoint de imagenes
/*
import getByFilters from '../../../../utils/services/get/getByFilters';
*/

const Alphabetical = () => {
  // TODO: Completar cuando este corregido el el endpoint de imagenes
  /*
  const [images, setImages] = useState([]);
  */
  const [activityData, setActivityData] = useState({
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

  function restartActivity() {
    setActivityData({
      elements: [
        {
          id: uuidv4(),
          name: 'GATO',
          src: imgCat,
          voice: voiceCat,
          width: 90,
          height: 85,
          draggable: true,
          matched: false
        },
        {
          id: uuidv4(),
          name: 'JIRAFA',
          src: imgGiraffe,
          voice: voiceGiraffe,
          width: 90,
          height: 85,
          draggable: true,
          matched: false
        },
        {
          id: uuidv4(),
          name: 'LEÓN',
          voice: voiceLion,
          src: imgLion,
          width: 90,
          height: 85,
          draggable: true,
          matched: false
        },
        {
          id: uuidv4(),
          name: 'PERRO',
          src: imgDog,
          voice: voiceDog,
          width: 90,
          height: 85,
          draggable: true,
          matched: false
        },
        {
          id: uuidv4(),
          name: 'ELEFANTE',
          voice: voiceElephant,
          src: imgElephant,
          width: 90,
          height: 85,
          draggable: true,
          matched: false
        }
      ],
      colors: ['#DE8971', '#7B6079', '#A7D0CD', '#FFE9D6']
    });
  }

  // TODO: Completar cuando este corregido el el endpoint de imagenes
  /*
  useEffect(() => {
    async function fetchImages() {
      console.log('Buscando imagenes');
      const filters = { category: 'animales' };
      const images = await getByFilters(`${BASE_URL}/literacy-resources`, filters);
      console.log('images', images);
      setImages(images);
    }
    fetchImages();
  }, []);
  */

  return (
    <React.Fragment>
      <div className='row'>
        <div className='pb-3 mt-2 col-md-8'>
          <Activity data={activityData} restartActivity={restartActivity} />
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
