import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Group, Arrow, Circle } from 'react-konva';
import { startAnimationConfites, generateConfites, getRandomItems } from './confites';
import banner from './images/others/banner.png';
import correctBanner from './images/others/correctBanner.png';

const Alphabetical = ({ data, resetActivity, restartActivity }) => {
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
      let banner = layerRef.current.find('#banner' + element.attrs.text);
      checkMatch();
      banner[0].image(imageFactory(correctBanner));
      banner[0].draw();
      startAnimationConfites(stageRef, layerRef);
      playAudio(itemLeftSelected.voice);
      checkFinishActivity();
    }
  }

  function checkMatch() {
    for (let i in itemGroupLeft) {
      if (itemGroupLeft[i].name === itemLeftSelected.name) {
        let tempItemGroupLeft = [...itemGroupLeft];
        tempItemGroupLeft[i].matched = true;
        setItemGroupLeft(tempItemGroupLeft);
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
      setOriginPoint([]);
      setTargetPoint([]);
      setArrowPoints([]);
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
    setItemLeftSelected({ name: element.name, voice: element.voice });
    const point = stageRef.current.getPointerPosition();
    const coords = Object.values(point);
    setOriginPoint(coords);
    setArrowPoints(coords);
  }

  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, backgroundColor: color }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef} onMouseMove={onMouseMove}>
        <Layer ref={layerRef}>
          {itemGroupLeft &&
            itemGroupLeft.map((element, index) => (
              <Group onMouseUp={() => handleLeftItem(element)}>
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
