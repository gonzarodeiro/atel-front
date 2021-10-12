import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import Confites from '../../Confites';
import bkgnd from './images/background.jpg';
import { imageFactory } from './commons/imageFactory';
import Letters from './components/professionalLetters';
import { clientEvents, registerEvent } from '../../../utils/socketManager';

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
    registerEvents();    
    setDimensions({ width: 700, height: 492 });
  }, []);

  useEffect(() => {    
    if (!elements) return;
    let celebrate = true;
    elements.forEach((element) => {
      if (!element.isCorrect) celebrate = false;
    });
    if (celebrate) setShowConfites(true);
  }, [elements]);

  function registerEvents(){
    setConfiguration();    
  }

  function setConfiguration() {    
    registerEvent( (obj) => {
      setElements(obj.elements);
    }, 
    clientEvents.setConfiguration);
  }

  function setCorrectElement(el) {
    setElements(
      elements.map((element) => {
        return {
          ...element,
          isCorrect: el === element.name ? true : element.isCorrect
        };
      })
    );
  }



  return (
    <div style={{ width: width, height: height, backgroundSize: 'cover', backgroundImage: `url("${bkgnd}")` }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer ref={layerRef}>
          {elements &&
            elements.map((element, index) => (
              <>
                <KonvaImage x={MARGIN} y={MARGIN_TOP + (MARGIN + 10) * index} id={'image' + element.name} image={imageFactory(element.src)} height={70} width={50} />
                <Letters stageRef={stageRef} element={element} indexElement={index} letters={element.charArray} setCorrectElement={setCorrectElement} />
              </>
            ))}
        </Layer>
        {showConfites && <Confites stageRef={stageRef} />}
      </Stage>
    </div>
  );
};

export default Boxes;
