import React, { useRef, useState, useEffect, useCallback } from "react";
import Konva from "konva";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Group,
  Arrow,
  Circle,
} from "react-konva";

import data from "./alphabetical-data";
import startAnimationConfites from "./confites";
import banner from "./images/others/banner.png";

const CONTAINER_SIZE = "100%";
const MARGIN = 16;
const MARGIN_TOP = 40;
const BANNER_SIZE = 240;
const BANNER_WIDTH = 679;
const BANNER_HEIGHT = 197;
const BANNER_RATIO = BANNER_HEIGHT / BANNER_WIDTH;

const Alphabetical = () => {
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const arrowRef = useRef(null);

  const confites = data.generateConfites(100, divRef);
  const [itemGroupLeft] = useState(data.elements);
  const [itemGroupRight] = useState(data.elementsReordered);
  const [color] = useState(data.colors[0]);
  const [originPoint, setOriginPoint] = useState([]);
  const [targetPoint, setTargetPoint] = useState([]);
  const [arrowPoints, setArrowPoints] = useState([]);
  const [{ width, height }, setDimensions] = useState({});

  useEffect(() => {
    if (divRef.current) {
      var rect = divRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      setDimensions({ width, height });
    }
  }, [divRef]);

  const onOriginClick = useCallback(() => {
    const point = stageRef.current.getPointerPosition();
    const coords = Object.values(point);
    setOriginPoint(coords);
    setArrowPoints(coords);
  }, []);

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

  const onTargetMouseUp = useCallback((id) => {
    const point = stageRef.current.getPointerPosition();
    const el = stageRef.current.getIntersection(point);
    if (el.parent.attrs.id === id) {
      console.log("Match");
      // Festejar o dibujar match
    }
    console.log(el);
  }, []);

  function imageFactory(x) {
    const rv = document.createElement("img");
    rv.src = x;
    return rv;
  }

  function oposedColor(color) {
    const aux = color.substring(1);
    const hex = "0x" + aux;
    const num = parseInt(hex);
    const comp = parseInt("0xffffff") - num;
    return "#" + comp.toString(16) + "ff";
  }

  const animateCircles = () => {
    startAnimationConfites(stageRef, layerRef);
  };

  return (
    <div
      style={{
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        backgroundColor: color,
      }}
      ref={divRef}
    >
      <button onClick={animateCircles}>asdasdas</button>
      <Stage
        width={width}
        height={height}
        d
        ref={stageRef}
        onMouseMove={onMouseMove}
      >
        <Layer ref={layerRef}>
          {itemGroupLeft &&
            itemGroupLeft.map((element, index) => (
              <KonvaImage
                key={element.id}
                id={element.id}
                x={MARGIN}
                y={MARGIN_TOP + (MARGIN + element.height) * index}
                width={element.width}
                height={element.height}
                image={imageFactory(element.src)}
                onClick={onOriginClick}
              />
            ))}
          {itemGroupRight &&
            itemGroupRight.map((element, index) => (
              <Group
                key={element.id}
                id={element.id}
                x={width - BANNER_SIZE - MARGIN}
                y={MARGIN_TOP + (MARGIN + element.height) * index}
                onMouseUp={() => onTargetMouseUp(element.id)}
              >
                <KonvaImage
                  image={imageFactory(banner)}
                  height={BANNER_SIZE * BANNER_RATIO}
                  width={BANNER_SIZE}
                />
                <Text
                  text={element.name}
                  height={element.height}
                  width={BANNER_SIZE}
                  fontVariant="bold"
                  fontSize={24}
                  align="center"
                  verticalAlign="middle"
                  strokeWidth={1}
                  fill="white"
                  shadowColor="black"
                  shadowBlur={10}
                />
              </Group>
            ))}
          <Arrow
            ref={arrowRef}
            points={
              arrowPoints.length === 4
                ? arrowPoints
                : originPoint.concat(targetPoint)
            }
            fill={oposedColor(color)}
            stroke={oposedColor(color)}
            strokeWidth={8}
            onClick={onTargetClick}
            lineJoin="round"
            lineCap="round"
            visible={arrowPoints.length || targetPoint.length}
          />
        </Layer>
        <Layer>
          {confites &&
            confites.map((element, index) => (
              <Circle
                id={"circle"}
                x={element.confite.x}
                y={element.confite.y}
                radius={element.confite.radius}
                fill={element.confite.fill}
              />
            ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Alphabetical;
