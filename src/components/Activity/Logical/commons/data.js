import { v4 as uuidv4 } from 'uuid';
import tray from '../../../../components/Activity/Logical/images/tray.png';
import banana from '../../../../components/Activity/Logical/images/fruits/bannana.png';
import apple from '../../../../components/Activity/Logical/images/fruits/apple.png';
import grape from '../../../../components/Activity/Logical/images/fruits/grape.png';
import lemon from '../../../../components/Activity/Logical/images/fruits/lemon.png';
import strawberry from '../../../../components/Activity/Logical/images/fruits/strawberry.png';

import cat from '../../../../components/Activity/Logical/images/animals/cat.png';
import dog from '../../../../components/Activity/Logical/images/animals/dog.png';
import elephant from '../../../../components/Activity/Logical/images/animals/elephant.png';
import giraffe from '../../../../components/Activity/Logical/images/animals/giraffe.png';
import lion from '../../../../components/Activity/Logical/images/animals/lion.png';
import { animals, containerTypes, fruits, operationTypes } from '../components/Settings/constants';

const getSourceByTypeAndSubtype = (type, subType) => {
  switch (type) {
    case containerTypes.FRUIT: {
      switch (subType) {
        case fruits.BANANA:
          return banana;
        case fruits.APPLE:
          return apple;
        case fruits.GRAPE:
          return grape;
        case fruits.LEMON:
          return lemon;
        case fruits.STRAWBERRY:
          return strawberry;
        default:
          break;
      }
      break;
    }
    case containerTypes.ANIMAL: {
      switch (subType) {
        case animals.CAT:
          return cat;
        case animals.DOG:
          return dog;
        case animals.ELEPHANT:
          return elephant;
        case animals.GIRAFFE:
          return giraffe;
        case animals.LION:
          return lion;
        default:
          break;
      }
      break;
    }
    default:
      break;
  }
  return;
};

/**
 * @param {object} settings user selected configuration
 * @returns {object|undefined} data to render in the activity
 */
const generateTraysFromSettings = (settings) => {
  if (!settings || !settings.containers || !settings.containers.count) return;
  if (!settings.containers.items || !settings.containers.items.length) return;

  let result = settings.containers.items.map((container) => ({
    id: uuidv4(),
    type: container.subType,
    src: tray,
    srcType: getSourceByTypeAndSubtype(container.type, container.subType),
    width: 160,
    height: 100,
    expectedQuantity: container.capacity,
    quantity: 0,
    draggable: false
  }));

  if(settings.operation != containerTypes.NONE){
    result.push({id: uuidv4(),
      type: "RESULT",
      src: tray,
      srcType: '.',
      width: 160,
      height: 100,
      expectedQuantity: 0,
      quantity: 0,
      draggable: false});
  }

  return result;
};

/**
 * @param {object} settings user selected configuration
 * @returns {object|undefined} data to render in the activity
 */
const generateElementsFromSettings = (settings) => {
  if (!settings || !settings.containers || !settings.containers.count) return;
  if (!settings.containers.items || !settings.containers.items.length) return;

  const result = [];
  settings.containers.items.forEach((container) => {
    for (let i = 0; i < container.capacity*3; i++) {
      result.push({
        id: uuidv4(),
        type: container.subType,
        src: getSourceByTypeAndSubtype(container.type, container.subType),
        width: 40,
        height: 50,
        draggable: true,
        x: 350,
        y: 350,
        isMouseUp: true
      });
    }
  });
  return result;
};

/**
 * @param {object} settings user selected configuration
 * @returns {object} data to render in the activity
 */
const getDataFromSettings = (settings) => {
  const operation = settings.operation;
  const trays = generateTraysFromSettings(settings);
  const elements = generateElementsFromSettings(settings);
  return { operation, trays, elements };
};



export { generateTraysFromSettings, generateElementsFromSettings, getDataFromSettings };
