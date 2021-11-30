import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Shape } from 'react-konva';
import Confites from '../../Confites';
import bkgnd from './images/background.jpg';
import { imageFactory } from './commons/imageFactory';
import Letters from './components/professionalLetters';
import { clientEvents, registerEvent, sendMessage } from '../../../utils/socketManager';

const Boxes = () => {
  const MARGIN = 80;
  const MARGIN_TOP = 80;
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [{ width, height }, setDimensions] = useState({});
  const [showConfites, setShowConfites] = useState(false);
  const [elements, setElements] = useState();
  const [studentPointerPosition, setStudentPointerPosition] = useState({ x: -20, y: -20 });

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
    if (celebrate) {
      setShowConfites(true);
    }else{
      setShowConfites(false);
    }
  }, [elements]);

  function registerEvents() {
    setConfiguration();
    registerEvent((obj) => {
      setStudentPointerPosition(obj);
    }, clientEvents.studentPointer);

    registerEvent((obj) => {
      setShowConfites(true);
    }, clientEvents.showConfitesBoxes);
  }

  function setConfiguration() {
    registerEvent((obj) => {
      setElements(obj.elements);
    }, clientEvents.setConfiguration);
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

  const onMouseMove = useCallback(() => {
    const point = stageRef.current.getPointerPosition();
    const coords = Object.values(point);
    sendMessage(clientEvents.studentPointer, { x: coords[0], y: coords[1] });
  });

  return (
    <div style={{ width: width, height: height, backgroundSize: 'cover', backgroundImage: `url("${bkgnd}")` }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef} onMouseMove={onMouseMove}>
        <Layer ref={layerRef}>
          {elements &&
            elements.map((element, index) => (
              <>
                <KonvaImage x={MARGIN} y={MARGIN_TOP + (MARGIN + 10) * index} id={'image' + element.name} image={imageFactory(element.src)} height={70} width={50} />
                <Letters stageRef={stageRef} element={element} indexElement={index} letters={element.charArray} setCorrectElement={setCorrectElement} />
              </>
            ))}
        </Layer>
        <Layer>
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(70, 20);
              context.lineTo(200, 80);
              context.quadraticCurveTo(150, 100, 100, 150);
              context.closePath();
              context.fillStrokeShape(shape);
              shape.scaleX(0.1);
              shape.scaleY(0.1);
              shape.x(studentPointerPosition.x);
              shape.y(studentPointerPosition.y);
            }}
            fill='#FFFFFFF'
            stroke='black'
            strokeWidth={0}
          />
        </Layer>
        {showConfites && <Confites stageRef={stageRef} />}
      </Stage>
    </div>
  );
};

export default Boxes;
