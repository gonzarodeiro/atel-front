import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage,} from 'react-konva';
import Confites from '../../Confites';
import bkgnd from './images/background.jpg';
import constElements from './commons/elements';
import { imageFactory } from './commons/imageFactory';

const Boxes = () => {

  const MARGIN = 80;
  const MARGIN_TOP = 80;

  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);  
  const [{ width, height }, setDimensions] = useState({});    
  const [showConfites, setShowConfites] = useState(false);
  const [elements, setElements] = useState();


  useEffect(() => {
    setConfiguration();
    setDimensions({ width: 700, height: 492 });
  }, []);

  function setConfiguration(){
     const newElements = getFourRandomElements(constElements);
     debugger;
    setElements(newElements);
  }

  function getFourRandomElements(elements){
    debugger;
    let lengthForRandom = elements.length-1;
    let newElements = [];
    let randomsGenerated = [];
    for(let i = 0; i < 4; i++){
      let number = Math.round(Math.random()*lengthForRandom);
      if(randomsGenerated.find(x => x == number) === undefined){
        randomsGenerated.push(number);
      }else{
        //deberia hacerlo recursivo, pero paja....
        let number = Math.round(Math.random()*lengthForRandom);
        randomsGenerated.push(number);
      }
        
      newElements.push( { name: elements[number].name, src: elements[number].src, charArray: elements[number].name.split("")})
    }
    return newElements;
  }

  return (
    <div style={{ width: width, height: height, backgroundSize: 'cover', backgroundImage: `url("${bkgnd}")` }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer ref={layerRef}>
        {elements &&
            elements.map((element, index) => (
              <>                 
                <KonvaImage  x={MARGIN} y={MARGIN_TOP + (MARGIN + 10) * index} id={'image' + element.name} image={imageFactory(element.src)} height={70} width={50} />                                
              </>
            ))}
        </Layer>
        {showConfites && <Confites stageRef={stageRef} />}
      </Stage>      
    </div>
  );
};

export default Boxes;
