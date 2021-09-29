import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Group, Arrow } from 'react-konva';
import { getRandomItems } from './commons/index';
import banner from './images/others/banner.png';
import correctBanner from './images/others/correctBanner.png';
import { sendMessage, clientEvents, registerEvent } from '../../../utils/socketManager';
import { imageFactory, oposedColor, playAudio } from './commons/index';
import Confites from '../../Confites';

const Alphabetical = ({ data, restartActivity }) => {
  const CONTAINER_SIZE = '100%',
    MARGIN = 20,
    MARGIN_TOP = 20,
    BANNER_SIZE = 250,
    BANNER_WIDTH = 650,
    BANNER_HEIGHT = 200,
    BANNER_RATIO = BANNER_HEIGHT / BANNER_WIDTH;

  const divRef = useRef(null),
    stageRef = useRef(null),
    arrowRef = useRef(null),
    audioRef = useRef(null);

  const elementsToUse = getRandomItems(data.elements);
  const [itemGroupLeft, setItemGroupLeft] = useState(elementsToUse);
  const [itemGroupRight, setItemGroupRight] = useState(getRandomItems(elementsToUse));
  const [color, setColor] = useState(getRandomItems(data.colors)[0]);
  const [arrowEnable, setArrowEnable] = useState(false);
  const [arrowPoints, setArrowPoints] = useState([]);
  const [{ width, height }, setDimensions] = useState({});
  const [showConfites, setShowConfites] = useState(false);
  const [itemLeftSelected, setItemLeftSelected] = useState({ name: '', voice: '' });
  const [playing, setPlaying] = useState('');

  useEffect(() => {
    registerEvent(() => {
      setArrowEnable(false);
      setArrowPoints([]);
      restartActivity();
    }, clientEvents.resetActivity);
  }, []);

  useEffect(() => {
    setResolution();
    setShowConfites(false);
    setConfiguration();
  }, [data]);

  function setResolution() {
    const width = 700;
    const height = 550;
    setDimensions({ width, height });
  }

  function setConfiguration() {
    const elementsLeft = getRandomItems(data.elements);
    const elementsRigth = getRandomItems(elementsLeft);
    const color = getRandomItems(data.colors)[1];
    setItemGroupLeft(elementsLeft);
    setItemGroupRight(elementsRigth);
    setColor(color);
    sendMessage(clientEvents.setConfiguration, { elementsLeft, elementsRigth, color });
  }

  function handleLeftItem(element) {
    setShowConfites(false);
    setItemLeftSelected({ name: element.name, voice: element.voice });
    const point = stageRef.current.getPointerPosition();
    const coords = Object.values(point);
    setArrowEnable(true);
    setArrowPoints(coords);
    sendMessage(clientEvents.onLeftItemClick, { coords, element });
  }

  const onMouseMove = useCallback(() => {
    const point = stageRef.current.getPointerPosition();
    const coords = Object.values(point);
    if (arrowEnable) {
      let newArrowPoints = arrowPoints.slice(0, 2).concat(coords);
      setArrowPoints(newArrowPoints);
      sendMessage(clientEvents.onMouseMove, newArrowPoints);
    }
    sendMessage(clientEvents.studentPointer, { x: coords[0], y: coords[1] });
  }, [arrowPoints, arrowEnable]);

  const handleArrowClick = useCallback(() => {
    const point = stageRef.current.getPointerPosition();
    const elements = stageRef.current.getAllIntersections(point);
    let element = elements.find((element) => element.attrs.id === 'text');
    checkTargetMatch(element);
    setArrowEnable(false);
  }, [itemLeftSelected]);

  function checkTargetMatch(element) {
    if (element && itemLeftSelected.name === element.attrs.text) {
      setShowConfites(true);
      checkMatch();
      playAudio(itemLeftSelected.voice, setPlaying, audioRef);
      if (!checkFinishActivity()) {
        sendMessage(clientEvents.targetMatch, { itemGroupRight });
      }
      sendMessage(clientEvents.playAudio, { voice: itemLeftSelected.voice });
    }
  }

  function checkMatch() {
    for (let i in itemGroupRight) {
      if (itemGroupRight[i].name === itemLeftSelected.name) {
        let tempItemGroupRight = [...itemGroupRight];
        tempItemGroupRight[i].matched = true;
        setItemGroupRight(tempItemGroupRight);
        break;
      }
    }
  }

  function checkFinishActivity() {
    let finish = true;
    for (let i in itemGroupLeft) {
      if (itemGroupLeft[i].matched === false) {
        finish = false;
        break;
      }
    }
    if (finish) {
      restartActivity();
      reset();
    }
    return finish;
  }

  function reset() {
    setArrowEnable(false);
    setArrowPoints([]);
  }

  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, backgroundColor: color }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef} onMouseMove={onMouseMove}>
        <Layer>
          {itemGroupLeft &&
            itemGroupLeft.map((element, index) => (
              <Group onClick={() => handleLeftItem(element)}>
                <KonvaImage key={element.id} x={MARGIN} y={MARGIN_TOP + (MARGIN + element.height) * index} width={element.width} height={element.height} image={imageFactory(element.src)} />
              </Group>
            ))}
          {itemGroupRight &&
            itemGroupRight.map((element, index) => (
              <Group key={element.id} id={element.id} x={width - BANNER_SIZE - MARGIN} y={MARGIN_TOP + (MARGIN + element.height) * index}>
                <KonvaImage id={'banner' + element.name} image={element.matched === false ? imageFactory(banner) : imageFactory(correctBanner)} height={BANNER_SIZE * BANNER_RATIO} width={BANNER_SIZE} />
                <Text id={'text'} text={element.name} height={element.height} width={BANNER_SIZE} fontVariant='bold' fontSize={24} align='center' verticalAlign='middle' strokeWidth={1} fill='white' shadowColor='black' shadowBlur={10} />
              </Group>
            ))}
          <Arrow ref={arrowRef} points={arrowPoints} fill={oposedColor(color)} stroke={oposedColor(color)} strokeWidth={8} lineJoin='round' lineCap='round' visible={arrowPoints.length > 0 || arrowEnable} onClick={handleArrowClick} />
        </Layer>
        {showConfites && <Confites stageRef={stageRef} />}
      </Stage>
      <audio controls={false} ref={audioRef}>
        <source src={playing} />
      </audio>
    </div>
  );
};

export default Alphabetical;
