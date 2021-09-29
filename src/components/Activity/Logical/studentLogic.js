import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text } from 'react-konva';
import Konva from 'konva';
import { imageFactory } from './commons/imageFactory';
import TrayGroup from './components/TrayGroup';
import Basket from './images/basket.png';
import { getAllingX } from './commons/alling';
import Confites from '../../Confites';
import { playAudio } from './commons/audio';
import celebrateMp3 from './commons/celebrate.mp3';
import { sendMessage, clientEvents, registerEvent } from '../../../utils/socketManager';
import { operationTypes } from './components/Settings/constants';
import bkgnd from './images/board.jpg';
import postResponseApi from '../../../utils/services/post/postResponseApi';
import { BASE_URL } from '../../../config/environment';

let metrics = { metricActivity: [] };
let currentActivityMetrics;
let currentMathOperation;
function addNewMetrics(mathType, types) {
  let metricalMath = [];
  types.forEach((type) => {
    metricalMath.push({
      type: type,
      fails: 0,
      success: 0
    });
  });

  return {
    type: mathType,
    activityFails: 0,
    activitySuccess: 0,
    total: 0,
    initialDTime: Date.now(),
    finishTime: null,
    diffTime: null,
    metricMatch: metricalMath
  };
}

function saveDropTry(type, success) {
  currentActivityMetrics.metricMatch.map((metric) => {
    if (!metric.type === type) return { ...metric };
    if (success) {
      return { ...metric, success: ++metric.success, total: ++metric.total };
    } else {
      return { ...metric, success: ++metric.fails, total: ++metric.total };
    }
  });
}

function saveMathTry(success) {
  if (success) {
    currentActivityMetrics.activitySuccess++;
  } else {
    currentActivityMetrics.activityFails++;
  }
  currentActivityMetrics.total++;
}

const Logical = ({ sessionId }) => {
  const CONTAINER_SIZE = '100%';
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const audioRef = useRef(null);
  const [{ width, height }, setDimensions] = useState({});
  const [trays, setTrays] = useState();
  const [elements, setElements] = useState();
  const [dataConfiguration, setDataConfiguration] = useState(null);
  const [showConfites, setShowConfites] = useState(false);
  const [mathOperation, setMathOperation] = useState();
  const [playing, setPlaying] = useState('');

  useEffect(() => {
    registerEvents();

    return async () => {
      await saveMetrics();
    };
  }, []);

  useEffect(() => {
    setShowConfites(false);
    setConfiguration();
  }, [dataConfiguration]);

  async function saveMetrics() {
    const dateNow = Date.now();
    if (currentActivityMetrics) metrics.metricActivity.push({ ...currentActivityMetrics, finishTime: dateNow, diffTime: dateNow - currentActivityMetrics.initialDTime });
    await postResponseApi(`${BASE_URL}/statistics/numerical/session/` + sessionId, metrics);
  }

  function registerEvents() {
    registerEvent((data) => {
      setDataConfiguration(data);
    }, clientEvents.setConfiguration);

    registerEvent((obj) => {
      checkResults(obj);
    }, clientEvents.checkResults);
  }

  function setConfiguration() {
    if (dataConfiguration) {
      const width = 700;
      const height = 500;
      setDimensions({ width, height });
      setTrays(dataConfiguration.trays);
      const elements = setXElements(dataConfiguration.elements, width);
      toInitialPositions(dataConfiguration.elements);
      setElements(elements);
      const mathOperation = convertOperation(dataConfiguration.operation);
      setMathOperation(mathOperation);
      currentMathOperation = mathOperation;
      const dateNow = Date.now();
      if (currentActivityMetrics) metrics.metricActivity.push({ ...currentActivityMetrics, finishTime: dateNow, diffTime: dateNow - currentActivityMetrics.initialDTime });
      currentActivityMetrics = addNewMetrics(dataConfiguration.operation, getTypes(elements));
      sendMessage(clientEvents.setConfiguration, { elements: elements, trays: dataConfiguration.trays, mathOperation: mathOperation });
    }
  }

  function toInitialPositions(elements) {
    elements.forEach((element, index) => {
      let konvaElement = stageRef.current.find((el) => el.attrs.id === 'element-' + index)[0];
      if (konvaElement) {
        konvaElement.x(element.x);
        konvaElement.y(element.y);
      }
    });
  }

  function setXElements(elements, width) {
    let result = [];
    //Por cada tipo
    getTypes(elements).map((obj, index, array) => {
      //Recorro los elementos y busco los de ese tipo
      let elementsOfType = [];
      elements.forEach((element) => {
        if (obj.type === element.type) {
          //Refactorizo los elementos y en base al tipo pongo la posicion
          elementsOfType.push({
            ...element,
            x: Math.round((width / (array.length + 1)) * (index + 1) - obj.width / 2),
            y: 380,
            xFix: Math.round((width / (array.length + 1)) * (index + 1) - obj.width / 2),
            yFix: 380
          });
        }
      });
      result = result.concat(elementsOfType);
    });
    return result;
  }

  function convertOperation(operationString) {
    switch (operationString) {
      case operationTypes.ADD:
        return '+';
      case operationTypes.SUB:
        return '-';
      case operationTypes.DIV:
        return '%';
      case operationTypes.MUL:
        return 'x';
      default:
        return null;
    }
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

  function moveTop(index) {
    const point = stageRef.current.getPointerPosition();
    const intersections = stageRef.current.getAllIntersections(point);
    const currentElement = intersections.find((element) => element.attrs.id === 'element-' + index);
    if (!currentElement) return;
    let group = currentElement.getParent();
    currentElement.moveToTop();
    group.moveToTop();
  }

  function updateTrayQuantity(index) {
    const point = stageRef.current.getPointerPosition();
    const intersections = stageRef.current.getAllIntersections(point);
    const currentElement = intersections.find((element) => element.attrs.id === 'element-' + index);
    const tray = intersections.find((element) => element.attrs.id.startsWith('tray'));
    let group;
    updateElementsPositions(index, point);
    if (!currentElement) return;
    if (tray) {
      group = tray.getParent();
      if (group.attrs.type !== currentElement.attrs.name && group.attrs.type !== 'RESULT') {
        currentElement.cache();
        sendMessage(clientEvents.setFilter, { id: currentElement.attrs.id, filter: true });
        currentElement.filters([Konva.Filters.Grayscale]);
        saveDropTry(currentElement.attrs.name, false);
      } else {
        sendMessage(clientEvents.setFilter, { id: currentElement.attrs.id, filter: false });
        currentElement.filters([]);
        saveDropTry(currentElement.attrs.name, true);
      }

      currentElement.moveTo(group);
    } else {
      group = currentElement.getParent();
      currentElement.moveTo(layerRef.current);
      sendMessage(clientEvents.setFilter, { id: currentElement.attrs.id, filter: false });
      currentElement.filters([]);
    }
    if (mathOperation) {
      stageRef.current.find((x) => x.attrs.id === 'circle-text-result')[0].moveToTop();
      stageRef.current.find((x) => x.attrs.id === 'quantity-result')[0].moveToTop();
    }
    updateGroups();
  }

  function checkFinish(trays) {
    let finish = true;
    let group = stageRef.current.find('.group-RESULT-2');
    let shouldBe = 0,
      result = 0,
      quantityType1 = 0,
      quantityType2 = 0,
      okType1 = false,
      okType2 = false;
    if (currentMathOperation) {
      switch (currentMathOperation) {
        case '+':
          shouldBe = trays[0].expectedQuantity + trays[1].expectedQuantity;
          result = trays[2].quantity;
          if (trays[0].type !== trays[1].type) {
            quantityType1 = group[0].find((x) => x.attrs.name === trays[0].type).length;
            quantityType2 = group[0].find((x) => x.attrs.name === trays[1].type).length;
            okType1 = quantityType1 === trays[0].expectedQuantity;
            okType2 = quantityType2 === trays[1].expectedQuantity;
            finish = result === shouldBe && okType1 && okType2;
          } else {
            finish = result === shouldBe;
          }
          break;
        case '-':
          shouldBe = trays[0].expectedQuantity - trays[1].expectedQuantity;
          result = trays[2].quantity;
          finish = result === shouldBe;
          break;
        case 'x':
          shouldBe = trays[0].expectedQuantity * trays[1].expectedQuantity;
          result = trays[2].quantity;
          finish = result === shouldBe;
          break;
        case '%':
          shouldBe = trays[0].expectedQuantity / trays[1].expectedQuantity;
          result = trays[2].quantity;
          finish = result === shouldBe;
          break;
        default:
      }
    } else {
      trays.forEach((x) => {
        if (x.quantity !== x.expectedQuantity) finish = false;
      });
    }
    return finish;
  }

  function updateGroups() {
    let copyofTrays = trays.map((x, index) => {
      let group = stageRef.current.find('.group-' + x.type + '-' + index);
      let elementsOfType = x.type === 'RESULT' ? group[0].find((x) => x.attrs.id.startsWith('element')) : group[0].find('.' + x.type);
      let newQuantity = elementsOfType.length;
      return { ...x, quantity: newQuantity };
    });
    setTrays(copyofTrays);
    sendMessage(clientEvents.trays, copyofTrays);
  }

  function updateElementsPositions(elementIndex, point) {
    let copyOfElements = [...elements];
    copyOfElements.map((element, index) => {
      if (elementIndex === index) {
        let newPoint = checkColision(point.x, point.y);
        return { ...element, x: newPoint.x, y: newPoint.y };
      }
      return element;
    });
    setElements(copyOfElements);
  }

  function checkColision(px, py) {
    let result = { x: px, y: py };
    if (px > width) result.x = width - 50;
    if (py > height) result.y = height - 50;
    if (px < 0) result.x = 0;
    if (py < 0) result.y = 0;
    return result;
  }

  const handleOnMouseOver = (i) => {
    setElements(
      elements.map((element, index) => {
        return {
          ...element,
          isOnMouseUp: i === index
        };
      })
    );
  };

  const handleOnMouseOut = (e) => {
    setElements(
      elements.map((element) => {
        return {
          ...element,
          isOnMouseUp: false
        };
      })
    );
  };

  function fixElementIntoStage(e) {
    const element = e.target;
    const point = stageRef.current.getPointerPosition();
    let newPoint = checkColision(point.x, point.y);
    element.x(newPoint.x);
    element.y(newPoint.y);
  }

  function sendPosition(e) {
    const element = e.target;
    const point = stageRef.current.getPointerPosition();
    const stateElements = [...elements];
    const id = parseInt(element.attrs.id.replace('element-', ''));
    stateElements[id].x = point.x;
    stateElements[id].y = point.y;
    sendMessage(clientEvents.elementPosition, { id: element.attrs.id, point: point });
  }

  function checkResults(trays) {
    if (checkFinish(trays)) {
      saveMathTry(true);
      sendMessage(clientEvents.showCelebration);
      playAudio(celebrateMp3, setPlaying, audioRef);
      setShowConfites(true);
    } else {
      saveMathTry(false);
    }
  }

  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, backgroundSize: 'cover', backgroundImage: `url("${bkgnd}")` }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer ref={layerRef}>
          {mathOperation &&
            trays &&
            trays.map((tray, index, array) => {
              return index < array.length - 1 ? <Text id={'Operation'} text={index === 0 ? mathOperation : '='} x={getAllingX(tray.width, index, array.length, width) + tray.width + 20} y={180} fontVariant='bold' fontSize={49} align='center' verticalAlign='middle' strokeWidth={1} fill='black' shadowColor='white' shadowBlur={10} /> : <></>;
            })}
          <TrayGroup trays={trays} width={width} />
          {elements && getTypes(elements).map((type) => <KonvaImage id='basket' x={type.xFix - 20} y={type.yFix} width={type.width + 50} height={type.height + 30} image={imageFactory(Basket)}></KonvaImage>)}
          {elements &&
            elements.map((element, index) => (
              <KonvaImage
                id={'element-' + index}
                name={element.type}
                onDragStart={() => moveTop(index)}
                onDragEnd={() => updateTrayQuantity(index, element)}
                onMouseOver={() => handleOnMouseOver(index)}
                onMouseOut={() => handleOnMouseOut()}
                onDragMove={(e) => {
                  fixElementIntoStage(e);
                  sendPosition(e);
                }}
                scaleX={element.isOnMouseUp ? 1.2 : 1}
                scaleY={element.isOnMouseUp ? 1.2 : 1}
                key={element.id}
                x={element.x}
                y={element.y}
                width={element.width}
                height={element.height}
                image={imageFactory(element.src)}
                draggable={element.draggable}
              />
            ))}
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
