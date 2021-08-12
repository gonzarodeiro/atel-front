import React, {useRef, useEffect, useState} from 'react';
import { Stage,Layer,Group, Image as KonvaImage, Text } from 'react-konva';
import { generateTrays } from './commons/tray';
import { generateElements } from './commons/elements';
import { imageFactory } from './commons/imageFactory';

const Logical = () => {
  const defaultColor = '#8896AB'; 
  const CONTAINER_SIZE = '100%';
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const MARGIN_TOP = 200;
  
  const [{ width, height }, setDimensions] = useState({});
  const [trays,setTrays] = useState();
  const [elements,setElements] = useState();

  useEffect(() =>{
    setResolution();
    setConfiguration(); // will be register in socket event listener
  },[]);

  function setResolution() {
    let rect = divRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    setDimensions({ width, height });  
  }

  function setConfiguration(){
    setTrays(generateTrays());
    setElements(generateElements());
  }
  
  function getAllingX(elementWidth, index, arrayLenght){  
    var stageWidth = width;    
    var relativeStageWidth = stageWidth / arrayLenght;
    var middleRelative = relativeStageWidth / 2;
    var offset = relativeStageWidth * (index);
    var x = (middleRelative) - (elementWidth/2) + offset;    
    return Math.round(x);
  }



  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE,backgroundColor: defaultColor }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer>
          {trays &&
            trays.map((element, index, array) => (
              <Group>
                <KonvaImage key={element.id} x={getAllingX(element.width, index, array.length)} y={150} width={element.width} height={element.height} image={imageFactory(element.src)} />
                <Text id={'quantity' + element.id} text={element.quantity} x={getAllingX(element.width, index, array.length) - 20} y={240}  height={20} width={20} fontVariant='bold' fontSize={24} align='center' verticalAlign='middle' strokeWidth={1} fill='white' shadowColor='black' shadowBlur={10} />
                <Text id={'expectedQuantity' + element.id} text={element.expectedQuantity} x={getAllingX(element.width, index, array.length) + element.width} y={240}  height={20} width={20} fontVariant='bold' fontSize={24} align='center' verticalAlign='middle' strokeWidth={1} fill='white' shadowColor='black' shadowBlur={10} />
                
              </Group>
              )
            )
          }
          {elements &&
            elements.map((element, index) => (
              <Group>
                <KonvaImage key={element.id} x={Math.round(Math.random()* (width/2) + 20)} y={350} width={element.width} height={element.height} image={imageFactory(element.src)} draggable={element.draggable} />
              </Group>
              )
            )
          }
        </Layer>
      </Stage>
    </div>
  )
};

export default Logical;
