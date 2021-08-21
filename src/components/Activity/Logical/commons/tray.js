import { v4 as uuidv4 } from 'uuid';
import tray from '../../../../components/Activity/Logical/images/tray.png';
import banana from '../../../../components/Activity/Logical/images/fruits/bannana.png';
import apple from '../../../../components/Activity/Logical/images/fruits/apple.png';

const generateTrays = () => {
  return [
    {
      id: uuidv4(),
      type: 'BANANA',
      src: tray,
      srcType: banana,
      width: 160,
      height: 120,
      expectedQuantity: 4,
      quantity: 0,
      draggable: false
    },
    {
      id: uuidv4(),
      type: 'MANZANA',
      src: tray,
      srcType: apple,
      width: 160,
      height: 120,
      expectedQuantity: 3,
      quantity: 0,
      draggable: false
    },
    {
      id: uuidv4(),
      type: 'RESULT',
      src: tray,
      srcType: '.',
      width: 160,
      height: 120,
      expectedQuantity: 0,
      quantity: 0,
      draggable: false
    }
  ];
};

export { generateTrays };
