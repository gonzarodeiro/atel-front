import React, {useRef, useEffect, useState} from 'react';
import { Stage,Layer,Group, Image as KonvaImage } from 'react-konva';
import { generateTrays } from './commons/tray';
import { imageFactory } from './commons/imageFactory';

const Logical = () => {
  const defaultColor = '#8896AB'; 
  const CONTAINER_SIZE = '100%';
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const MARGIN_TOP = 200;
  
  const [{ width, height }, setDimensions] = useState({});
  const [trays,setTrays] = useState();

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
