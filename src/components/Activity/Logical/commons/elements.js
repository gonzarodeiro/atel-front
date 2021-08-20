import { v4 as uuidv4 } from 'uuid';
import bannana from '../../../../components/Activity/Logical/images/bannana.png';
const generateElements = (w) => {
  return Array(5).fill({
    id: uuidv4(),
    type: 'BANANA',
    src: bannana,
    width: 40,
    height: 50,
    draggable: true,
    x: Math.round(Math.random() * (w / 2) + 20),
    y: 350,
    isMouseUp: true
  });
};

export { generateElements };
