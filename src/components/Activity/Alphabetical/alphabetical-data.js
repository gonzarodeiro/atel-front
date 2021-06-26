import { v4 as uuidv4 } from 'uuid';
import imgApple from './images/fruits/fruit_apple.png';
import imgBanana from './images/fruits/fruit_banana.png';
import imgCherry from './images/fruits/fruit_cherry.png';
import imgGrape from './images/fruits/fruit_grape.png';
import imgLemon from './images/fruits/fruit_lemon.png';
import imgStrawberry from './images/fruits/fruit_strawberry.png';

// https://voicemaker.in/
import voiceApple from './audio/fruits/voice-manzana.mp3';
import voiceBanana from './audio/fruits/voice-banana.mp3';
import voiceCherry from './audio/fruits/voice-cereza.mp3';
import voiceGrape from './audio/fruits/voice-uva.mp3';
import voiceLemon from './audio/fruits/voice-limon.mp3';
import voiceStrawberry from './audio/fruits/voice-frutilla.mp3';

const data = {
  elements: [
    {
      id: uuidv4(),
      name: 'Manzana',
      src: imgApple,
      voice: voiceApple,
      width: 70,
      height: 70,
      draggable: true
    },
    {
      id: uuidv4(),
      name: 'Banana',
      src: imgBanana,
      voice: voiceBanana,
      width: 70,
      height: 70,
      draggable: true
    },
    {
      id: uuidv4(),
      name: 'Cereza',
      src: imgCherry,
      voice: voiceCherry,
      width: 70,
      height: 70,
      draggable: true
    },
    {
      id: uuidv4(),
      name: 'Uva',
      src: imgGrape,
      voice: voiceGrape,
      width: 70,
      height: 70,
      draggable: true
    },
    {
      id: uuidv4(),
      name: 'Limón',
      src: imgLemon,
      voice: voiceLemon,
      width: 70,
      height: 70,
      draggable: true
    },
    {
      id: uuidv4(),
      name: 'Frutilla',
      src: imgStrawberry,
      voice: voiceStrawberry,
      width: 70,
      height: 70,
      draggable: true
    }
  ],
  colors: ['#DE8971', '#7B6079', '#A7D0CD', '#FFE9D6']
};

const NotArrayParameterError = 'randomizeArray(): parameter should be an array';

function randomizeArray(array) {
  if (Array.isArray(array)) {
    const items = [...array];
    items.sort(() => (Math.random() > 0.5 ? 1 : -1));
    return items;
  }
  throw Error(NotArrayParameterError);
}

const COUNT = 5;

function getRandomItems(elements) {
  const randomWords = randomizeArray(elements);
  return randomWords.slice(0, COUNT);
}

const elementsToUse = getRandomItems(data.elements);
const elementsToUseReordered = getRandomItems(elementsToUse);

export default {
  elements: elementsToUse,
  elementsReordered: elementsToUseReordered,
  colors: getRandomItems(data.colors)
};
