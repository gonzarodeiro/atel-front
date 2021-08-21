import { v4 as uuidv4 } from 'uuid';
import apple from '../../../../components/Activity/Logical/images/fruits/apple.png';
import banana from '../../../../components/Activity/Logical/images/fruits/bannana.png';

const generateElements = (w) => {
  var firstElement = Array(10).fill({
    id: uuidv4(),
    type: 'BANANA',
    src: banana,
    width: 40,
    height: 50,
    draggable: true,
    x: Math.round(w / 2 + 50),
    y: 350,
    isMouseUp: true
  });

  var secondElement = Array(10).fill({
    id: uuidv4(),
    type: 'MANZANA',
    src: apple,
    width: 40,
    height: 50,
    draggable: true,
    x: Math.round(w / 2 - 50),
    y: 350,
    isMouseUp: true
  });

  return firstElement.concat(secondElement);
};

export { generateElements };
