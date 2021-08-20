import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import { generateTrays } from './commons/tray';
import { generateElements } from './commons/elements';
import { imageFactory } from './commons/imageFactory';
import TrayGroup from './components/TrayGroup';
import Basket from './images/basket.png'


const Logical = () => {  
  const CONTAINER_SIZE = '100%';
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [{ width, height }, setDimensions] = useState({});
  const [trays, setTrays] = useState();
  const [elements, setElements] = useState();    
  useEffect(() => {
    setConfiguration(); // will be register in socket event listener
  }, []);

  function setConfiguration() {
    const width = 700;
    const height = 500;
    setDimensions({ width, height });
    setTrays(generateTrays());
    setElements(generateElements(width));    
  }

  function getTypes(elements){
    const returnObject = {};
    elements.forEach(element => {
      returnObject[element.type] = {
        type:element.type,
        height:element.height,
        width:element.width,
        x:element.x,
        y:element.y
      };                
    });
    var result = Object.keys(returnObject).map(x=>{
      return {...returnObject[x]}        
    });
    debugger;
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
      currentElement.moveTo(group);
    } else {
      group = currentElement.getParent();
      currentElement.moveTo(layerRef.current);
    }
    updateGroups();
  }

  function updateGroups() {
    let copyofTrays = trays.map((x) => {
      let group = stageRef.current.find('.group-' + x.type);
      let elementsOfType = group[0].find('.' + x.type);
      let newQuantity = elementsOfType.length;
      return { ...x, quantity: newQuantity };
    });
    setTrays(copyofTrays);
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

  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, backgroundSize: "cover", backgroundImage: `url("https://i.pinimg.com/736x/25/be/35/25be353e2ca5f0c9ed8c9e3cfbc02d23.jpg")`}} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer ref={layerRef}>          
          <TrayGroup trays={trays} width={width} />
          {elements && getTypes(elements).map((type) => (
            <KonvaImage id="basket" x={type.x-20} y={type.y} width={type.width+50} height={type.height+30} image={imageFactory(Basket)}></KonvaImage>
          ))}
          {elements && elements.map((element, index) => (                 
            <KonvaImage id={'element-' + index} name={element.type} onDragStart={() => moveTop(index)} onDragEnd={() => updateTrayQuantity(index, element)} onMouseOver={() => handleOnMouseOver(index)} onMouseOut={() => handleOnMouseOut()} onDragMove={(e) => fixElementIntoStage(e)} scaleX={element.isOnMouseUp ? 1.2 : 1} scaleY={element.isOnMouseUp ? 1.2 : 1} key={element.id} x={element.x} y={element.y} width={element.width} height={element.height} image={imageFactory(element.src)} draggable={element.draggable} />                  
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Logical;
