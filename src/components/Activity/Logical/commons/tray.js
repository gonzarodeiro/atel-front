import { v4 as uuidv4 } from 'uuid';
import tray from '../../../../components/Activity/Logical/images/tray.png';
import bannana from '../../../../components/Activity/Logical/images/bannana.png';
import apple from '../../../../components/Activity/Logical/images/apple.png';
const generateTrays = () => {  

  return [ 
    {
      id: uuidv4(),
      type: "BANANA",
      src: tray,
      srcType: bannana,
      width: 160,
      height: 100,
      expectedQuantity : 4,
      quantity:0,
      draggable: false,      
    },
    {
      id: uuidv4(),
      type: "MANZANA",
      src: tray,
      srcType: apple,
      width: 160,
      height: 100,
      expectedQuantity : 3,
      quantity:0,
      draggable: false,
    }
  ];
}

export {generateTrays}