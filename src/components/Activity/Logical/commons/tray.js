import { v4 as uuidv4 } from 'uuid';
import tray from '../../../../components/Activity/Logical/images/tray.png';
const generateTrays = () => {  

  return [ 
    {
      id: uuidv4(),
      type: "BANANA",
      src: tray,
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
      width: 160,
      height: 100,
      expectedQuantity : 3,
      quantity:0,
      draggable: false,
    }
  ];
}

export {generateTrays}