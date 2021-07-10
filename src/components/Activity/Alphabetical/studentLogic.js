import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Group, Arrow, Circle } from 'react-konva';
import { startAnimationConfites, generateConfites, getRandomItems } from './commons/confites';
import banner from './images/others/banner.png';
import correctBanner from './images/others/correctBanner.png';
import { sendMessage, clientEvents, registerEvent } from '../../../utils/socketManager';

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
    layerRef = useRef(null),
    arrowRef = useRef(null),
    audioRef = useRef(null);

  const confites = generateConfites(100, divRef);
  const elementsToUse = getRandomItems(data.elements);
  const [itemGroupLeft, setItemGroupLeft] = useState(elementsToUse);
  const [itemGroupRight, setItemGroupRight] = useState(getRandomItems(elementsToUse));
  const [color, setColor] = useState(getRandomItems(data.colors)[0]);

  const [arrowEnable, setArrowEnable] = useState(false);
  const [arrowPoints, setArrowPoints] = useState([]); // Contiene un par de coordenadas ( Inicio y Fin )

  const [{ width, height }, setDimensions] = useState({});
  const [showConfites, setShowConfites] = useState(false);
  const [itemLeftSelected, setItemLeftSelected] = useState({ name: '', voice: '' });
  const [playing, setPlaying] = useState('');

  registerEvent(() => restartActivity(), clientEvents.resetActivity);

  useEffect(() => {
    setResolution();
    setShowConfites(false);
    const elementsLeft = getRandomItems(data.elements);
    const elementsRigth = getRandomItems(elementsLeft);
    const color = getRandomItems(data.colors)[1];
    setItemGroupLeft(elementsLeft);
    setItemGroupRight(elementsRigth);
    setColor(color);
    sendMessage(clientEvents.setConfiguration, { elementsLeft, elementsRigth, color });
  }, [data]);

  function setResolution() {
    const width = 700;
    const height = 550;
    setDimensions({ width, height });
  }

  //Captura el click sobre un objeto de la izquieda e instancia la flecha
  function handleLeftItem(element) {
    setShowConfites(false);
    setItemLeftSelected({ name: element.name, voice: element.voice });
    const point = stageRef.current.getPointerPosition();
    const coords = Object.values(point);
    setArrowEnable(true);
    setArrowPoints(coords);
    sendMessage(clientEvents.onLeftItemClick, { coords, element });
  }

  //Hace que la flecha siga al mouse
  const onMouseMove = useCallback(() => {
    if (arrowEnable) {
      const point = stageRef.current.getPointerPosition();
      const coords = Object.values(point);
      var newArrowPoints = arrowPoints.slice(0, 2).concat(coords);
      setArrowPoints(newArrowPoints);
      sendMessage(clientEvents.onMouseMove, newArrowPoints);
    }
  }, [arrowPoints, arrowEnable]);

  // Cuando se detecta el click del arrow se congela el arrow mediante setOriginPoint
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
      startAnimationConfites(stageRef, layerRef);
      playAudio(itemLeftSelected.voice);
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

  const playAudio = (voice) => {
    setPlaying(voice);
    play();
  };

  function play() {
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
  }

  function imageFactory(x) {
    const rv = document.createElement('img');
    rv.src = x;
    return rv;
  }

  function oposedColor(color) {
    const aux = color.substring(1);
    const hex = '0x' + aux;
    const num = parseInt(hex);
    const comp = parseInt('0xffffff') - num;
    return '#' + comp.toString(16) + 'ff';
  }

  //Cada vez que se modifica un state del componente esto se vuelve a ejecutar
  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, backgroundColor: color }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef} onMouseMove={onMouseMove}>
        <Layer ref={layerRef}>
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
          <Arrow ref={arrowRef} points={arrowPoints} fill={oposedColor(color)} stroke={oposedColor(color)} strokeWidth={8} lineJoin='round' lineCap='round' visible={arrowPoints.length || arrowEnable} onClick={handleArrowClick} />
        </Layer>
        {showConfites && <Layer>{confites && confites.map((element) => <Circle id={'circle'} x={element.confite.x} y={element.confite.y} radius={element.confite.radius} fill={element.confite.fill} />)}</Layer>}
      </Stage>
      <audio controls={false} ref={audioRef}>
        <source src={playing} />
      </audio>
    </div>
  );
};

export default Alphabetical;
