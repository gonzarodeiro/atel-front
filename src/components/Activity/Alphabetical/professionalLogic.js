import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Group, Arrow, Shape } from 'react-konva';
import banner from './images/others/banner.png';
import correctBanner from './images/others/correctBanner.png';
import { registerEvent, clientEvents } from '../../../utils/socketManager';
import { imageFactory, oposedColor, playAudio } from './commons/index';
import Confites from '../../Confites';

const Alphabetical = () => {
  const defaultColor = '#DE8971';
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

  const [itemGroupLeft, setItemGroupLeft] = useState([]);
  const [itemGroupRight, setItemGroupRight] = useState([]);
  const [color, setColor] = useState(defaultColor);
  const [arrowEnable, setArrowEnable] = useState(false);
  const [arrowPoints, setArrowPoints] = useState([]);
  const [{ width, height }, setDimensions] = useState({});
  const [showConfites, setShowConfites] = useState(false);
  const [playing, setPlaying] = useState('');
  const [studentPointerPosition, setStudentPointerPosition] = useState({ x: -20, y: -20 });

  useEffect(() => {
    setResolution();
    setShowConfites(false);
    setEventListeners();
  }, []);

  function setResolution() {
    let rect = divRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    setDimensions({ width, height });
  }

  function setEventListeners() {
    setConfiguration();
    registerEvents();
  }

  function setConfiguration() {
    registerEvent((obj) => {
      setItemGroupLeft(obj.elementsLeft);
      setItemGroupRight(obj.elementsRigth);
      setColor(obj.color);
      setArrowEnable(false);
      setArrowPoints([]);
    }, clientEvents.setConfiguration);
  }

  function registerEvents() {
    registerEvent((obj) => {
      // setShowConfites(false);
      setArrowEnable(true);
      setArrowPoints(obj.coords);
    }, clientEvents.onLeftItemClick);

    registerEvent((obj) => {
      setArrowPoints(obj);
    }, clientEvents.onMouseMove);

    registerEvent((obj) => {
      // setShowConfites(true);
      setItemGroupRight(obj.itemGroupRight);
      playAudio(obj.voice, setPlaying, audioRef);
    }, clientEvents.targetMatch);

    registerEvent((obj) => {
      playAudio(obj.voice, setPlaying, audioRef);
    }, clientEvents.playAudio);

    registerEvent((obj) => {
      setStudentPointerPosition(obj);
    }, clientEvents.studentPointer);
  }

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
          <Arrow ref={arrowRef} points={arrowPoints} fill={oposedColor(color)} stroke={oposedColor(color)} strokeWidth={8} lineJoin='round' lineCap='round' visible={arrowPoints.length > 0 || arrowEnable} />
        </Layer>
        {showConfites && <Confites stageRef={stageRef} />}
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
      </Stage>
      <audio controls={false} ref={audioRef}>
        <source src={playing} />
      </audio>
    </div>
  );
};

export default Alphabetical;
