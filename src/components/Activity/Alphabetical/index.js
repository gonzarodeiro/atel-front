import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Group, Arrow, Circle } from 'react-konva';
import { startAnimationConfites, generateConfites, getRandomItems } from './confites';
import banner from './images/others/banner.png';

const Alphabetical = ({ data, resetActivity }) => {
  const CONTAINER_SIZE = '100%',
    MARGIN = 20,
    MARGIN_TOP = 20,
    BANNER_SIZE = 250,
    BANNER_WIDTH = 650,
    BANNER_HEIGHT = 200,
    BANNER_RATIO = BANNER_HEIGHT / BANNER_WIDTH,
    POINTS_COUNT = 4;

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
  const [originPoint, setOriginPoint] = useState([]);
  const [targetPoint, setTargetPoint] = useState([]);
  const [arrowPoints, setArrowPoints] = useState([]);
  const [{ width, height }, setDimensions] = useState({});
  const [showConfites, setShowConfites] = useState(false);
  const [itemLeftSelected, setItemLeftSelected] = useState({ name: '', voice: '' });
  const [playing, setPlaying] = useState('');

  useEffect(() => {
    if (divRef.current) {
      let rect = divRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      setDimensions({ width, height });
    }
    setShowConfites(false);
    setItemGroupLeft(getRandomItems(data.elements));
    setItemGroupRight(getRandomItems(elementsToUse));
    setColor(getRandomItems(data.colors)[1]);
    if (resetActivity) {
      setOriginPoint([]);
      setTargetPoint([]);
      setArrowPoints([]);
    }
  }, [data]);

  const onMouseMove = useCallback(() => {
    if (originPoint.length) {
      const point = stageRef.current.getPointerPosition();
      const coords = Object.values(point);
      setTargetPoint(coords);
    }
  }, [originPoint.length]);

  const onTargetClick = useCallback(() => {
    const point = stageRef.current.getPointerPosition();
    const coords = Object.values(point);
    setTargetPoint(coords);
    setArrowPoints((old) => old.concat(coords));
    setOriginPoint([]);
    setTargetPoint([]);
  }, []);

  function checkTargetMatch(element) {
    if (element && itemLeftSelected.name === element.attrs.text) {
      setShowConfites(true);
      startAnimationConfites(stageRef, layerRef);
      playAudio(itemLeftSelected.voice);
    }
  }

  function handleArrowMouseUp() {
    const point = stageRef.current.getPointerPosition();
    const elements = stageRef.current.getAllIntersections(point);
    let el = elements.find((element) => element.attrs.id === 'text');
    checkTargetMatch(el);
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

  function handleLeftItem(element) {
    setShowConfites(false);
    setItemLeftSelected({
      name: element.name,
      voice: element.voice
    });
    const point = stageRef.current.getPointerPosition();
    const coords = Object.values(point);
    setOriginPoint(coords);
    setArrowPoints(coords);
  }

  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, backgroundColor: color }} ref={divRef}>
      <Stage width={width} height={height} d ref={stageRef} onMouseMove={onMouseMove}>
        <Layer ref={layerRef}>
          {itemGroupLeft &&
            itemGroupLeft.map((element, index) => (
              <Group onMouseUp={() => handleLeftItem(element)}>
                <KonvaImage key={element.id} id={element.id} x={MARGIN} y={MARGIN_TOP + (MARGIN + element.height) * index} width={element.width} height={element.height} image={imageFactory(element.src)} />
              </Group>
            ))}
          {itemGroupRight &&
            itemGroupRight.map((element, index) => (
              <Group key={element.id} id={element.id} x={width - BANNER_SIZE - MARGIN} y={MARGIN_TOP + (MARGIN + element.height) * index}>
                <KonvaImage image={imageFactory(banner)} height={BANNER_SIZE * BANNER_RATIO} width={BANNER_SIZE} />
                <Text id={'text'} text={element.name} height={element.height} width={BANNER_SIZE} fontVariant='bold' fontSize={24} align='center' verticalAlign='middle' strokeWidth={1} fill='white' shadowColor='black' shadowBlur={10} />
              </Group>
            ))}
          <Arrow ref={arrowRef} points={arrowPoints.length === POINTS_COUNT ? arrowPoints : originPoint.concat(targetPoint)} fill={oposedColor(color)} stroke={oposedColor(color)} strokeWidth={8} onClick={onTargetClick} lineJoin='round' lineCap='round' visible={arrowPoints.length || targetPoint.length} onMouseUp={handleArrowMouseUp} />
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
