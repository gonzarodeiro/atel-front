import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text } from 'react-konva';
import { imageFactory } from './commons/imageFactory';
import TrayGroup from './components/TrayGroup';
import { sendMessage, registerEvent, clientEvents } from '../../../utils/socketManager';
import Konva from 'konva';
import Basket from './images/basket.png';
import { getAllingX } from './commons/alling';
import Confites from '../../Confites';
import { playAudio } from './commons/audio';
import celebrateMp3 from './commons/celebrate.mp3';
import { getDataFromSettings } from '../../../components/Activity/Logical/commons/data';
import { initialSettings } from '../../../components/Activity/Logical/components/Settings';
import bkgnd from './images/board.jpg';

const Logical = ({ validate }) => {
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const audioRef = useRef(null);
  const validateRef = useRef();
  const [{ width, height }, setDimensions] = useState({});
  const [trays, setTrays] = useState();
  const [elements, setElements] = useState();
  const [showConfites, setShowConfites] = useState(false);
  const [mathOperation, setMathOperation] = useState();
  const [playing, setPlaying] = useState('');

  useEffect(() => {
    validateRef.current = validate;
    setShowConfites(false);
    setEventListeners();
    const initialData = getDataFromSettings(initialSettings);
    sendMessage(clientEvents.setConfiguration, initialData);
  }, []);

  /**
   * este useEffect se ejecuta cada
   * vez que cambia la prop "validate"
   */
  useEffect(() => {
    if (validateRef.current !== validate) {
      sendMessage(clientEvents.checkResults, trays);
    }
    validateRef.current = validate;
  }, [validate]);

  function setEventListeners() {
    setConfiguration();
    registerEvents();
  }

  function setConfiguration() {
    registerEvent((obj) => {
      setElements(obj.elements);
      setDimensions({ width: 700, height: 492 });
      setTrays(obj.trays);
      setMathOperation(obj.mathOperation);
    }, clientEvents.setConfiguration);
  }

  function registerEvents() {
    registerEvent((obj) => {
      // setElements(obj);
      setElementPosition(obj.id, obj.point);
    }, clientEvents.elementPosition);

    registerEvent((obj) => {
      setTrays(obj);
      setShowConfites(false);
    }, clientEvents.trays);

    registerEvent((obj) => {
      let element = stageRef.current.find((x) => x.attrs.id === obj.id)[0];
      if (obj.filter) {
        element.cache();
        element.filters([Konva.Filters.Grayscale]);
      } else {
        element.filters([]);
      }
    }, clientEvents.setFilter);

    registerEvent(() => {
      playAudio(celebrateMp3, setPlaying, audioRef);
      setShowConfites(true);
    }, clientEvents.showCelebration);
  }

  function setElementPosition(id, point) {
    let element = stageRef.current.find((el) => el.attrs.id === id)[0];
    element.x(point.x);
    element.y(point.y);
  }

  function getTypes(elements) {
    const returnObject = {};
    elements.forEach((element) => {
      returnObject[element.type] = {
        type: element.type,
        height: element.height,
        width: element.width,
        x: element.x,
        y: element.y,
        xFix: element.xFix,
        yFix: element.yFix
      };
    });
    var result = Object.keys(returnObject).map((x) => {
      return { ...returnObject[x] };
    });
    return result;
  }

  return (
    <div style={{ width: width, height: height, backgroundSize: 'cover', backgroundImage: `url("${bkgnd}")` }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer ref={layerRef}>
          {mathOperation &&
            trays &&
            trays.map((tray, index, array) => {
              return index < array.length - 1 ? <Text id={'Operation'} text={index === 0 ? mathOperation : '='} x={getAllingX(tray.width, index, array.length, width) + tray.width + 20} y={180} fontVariant='bold' fontSize={49} align='center' verticalAlign='middle' strokeWidth={1} fill='black' shadowColor='white' shadowBlur={10} /> : <></>;
            })}
          <TrayGroup trays={trays} width={width} />
          {elements && getTypes(elements).map((type) => <KonvaImage id='basket' x={type.xFix - 20} y={type.yFix} width={type.width + 50} height={type.height + 30} image={imageFactory(Basket)}></KonvaImage>)}
          {elements && elements.map((element, index) => <KonvaImage key={element.id} id={'element-' + index} name={element.type} x={elements[index].x} y={elements[index].y} width={element.width} height={element.height} image={imageFactory(element.src)} draggable={false} />)}
        </Layer>
        {showConfites && <Confites stageRef={stageRef} />}
      </Stage>
      <audio controls={false} ref={audioRef}>
        <source src={playing} />
      </audio>
    </div>
  );
};

export default Logical;
