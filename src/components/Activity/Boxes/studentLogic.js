import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Shape } from 'react-konva';
import Confites from '../../Confites';
import bkgnd from './images/background.jpg';
import constElements from './commons/elements';
import { imageFactory } from './commons/imageFactory';
import Letters from './components/Letters';
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
    setConfiguration();
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
      sendMessage(clientEvents.showConfitesBoxes);
    }

  }, [elements]);

  function registerEvents() {
    registerEvent(() => {
      setConfiguration();
    }, clientEvents.resetActivity);

    registerEvent((obj) => {
      setStudentPointerPosition(obj);
    }, clientEvents.studentPointer);
  }

  function setConfiguration() {
    const newElements = getFourRandomElements(constElements);
    setElements(newElements);
    sendMessage(clientEvents.setConfiguration, { elements: newElements });
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

  function getFourRandomElements(elements) {
    let lengthForRandom = elements.length - 1;
    let newElements = [];
    let arr = [];

    while (arr.length < 4) {
      let r = Math.round(Math.random() * lengthForRandom);
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    for (let i = 0; i < 4; i++) {
      let number = arr[i];
      newElements.push({ name: elements[number].name, src: elements[number].src, charArray: elements[number].name.split('') });
    }
    return newElements;
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
