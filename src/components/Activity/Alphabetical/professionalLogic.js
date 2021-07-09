import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Group, Arrow, Circle } from 'react-konva';
import { startAnimationConfites, generateConfites, getRandomItems } from './commons/confites';
import banner from './images/others/banner.png';
import correctBanner from './images/others/correctBanner.png';
import { registerEvent } from '../../../utils/socketClient/socketManager';
import events from '../../Activity/Alphabetical/commons/events';

const Alphabetical = ({ data, resetActivity, restartActivity }) => {
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

  const [itemGroupLeft, setItemGroupLeft] = useState([]);
  const [itemGroupRight, setItemGroupRight] = useState([]);
  const [color, setColor] = useState(getRandomItems(data.colors)[0]);

  const [arrowEnable, setArrowEnable] = useState(false);
  const [arrowPoints, setArrowPoints] = useState([]); // Contiene un par de coordenadas ( Inicio y Fin )

  const [{ width, height }, setDimensions] = useState({});
  const [showConfites, setShowConfites] = useState(false);
  const [playing, setPlaying] = useState('');

  useEffect(() => {
    setResolution();
    setShowConfites(false);
    setEventListeners();
    setColor(getRandomItems(data.colors)[1]);
    if (resetActivity) reset();
  }, [data]);

  function setResolution() {
    let rect = divRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    setDimensions({ width, height });
  }

  function setEventListeners() {
    setConfiguration();
    getStudentsMovements();
  }

  function setConfiguration() {
    registerEvent((obj) => {
      debugger;
      setItemGroupLeft(obj.elementsLeft);
      setItemGroupRight(obj.elementsRigth);
    }, events.setConfiguration);
  }

  function getStudentsMovements() {
    //resuelto
    registerEvent((obj) => {
      setShowConfites(false);
      setArrowEnable(true);
      setArrowPoints(obj.coords);
    }, events.onLeftItemClick);

    //resuelto
    registerEvent((obj) => {
      setArrowPoints(obj);
    }, events.onMouseMove);

    registerEvent((element) => {
      setShowConfites(true);
      let banner = layerRef.current.find('#banner' + element.text);
      banner[0].image(imageFactory(correctBanner));
      banner[0].draw();

      let tempItemGroupLeft = itemGroupLeft.map((item) => ({
        ...item,
        matched: item.name == element.name
      }));

      setItemGroupLeft(tempItemGroupLeft);
      startAnimationConfites(stageRef, layerRef);
    }, events.targetMatch);
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
  //Del lado del profesional no se capturan eventos

  //TODO itemsGroupLeft e itemsGroupRigth se pueden unificar en un mismo arraw de objetos
  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, backgroundColor: color }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer ref={layerRef}>
          {itemGroupLeft &&
            itemGroupLeft.map((element, index) => (
              <Group>
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
          <Arrow ref={arrowRef} points={arrowPoints} fill={oposedColor(color)} stroke={oposedColor(color)} strokeWidth={8} lineJoin='round' lineCap='round' visible={arrowPoints.length || arrowEnable} />
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
