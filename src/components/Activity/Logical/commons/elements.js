import { v4 as uuidv4 } from 'uuid';
import bannana from '../../../../components/Activity/Logical/images/bannana.png';
const generateElements = () => {  

  return Array(5).fill({
    id: uuidv4(),
    type: "BANANA",
    src: bannana,
    width: 40,
    height: 50,
    draggable: true,

  });
}

export {generateElements}