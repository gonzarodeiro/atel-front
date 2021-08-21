import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text } from 'react-konva';
import Konva from 'konva';
import { generateTrays } from './commons/tray';
import { generateElements } from './commons/elements';
import { imageFactory } from './commons/imageFactory';
import TrayGroup from './components/TrayGroup';
import Basket from './images/basket.png';
import { getAllingX }  from './commons/alling';
import Confites from '../../Confites';
import {playAudio} from './commons/audio'
import celebrateMp3 from './commons/celebrate.mp3'

const Logical = () => {  
  const CONTAINER_SIZE = '100%';
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const audioRef = useRef(null);
  const [{ width, height }, setDimensions] = useState({});
  const [trays, setTrays] = useState();
  const [elements, setElements] = useState();  
  const [showConfites, setShowConfites] = useState(false);  
  const mathOperator = "%";
  const [playing, setPlaying] = useState('');

  useEffect(() => {
    setShowConfites(false);
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
      if(group.attrs.type !== currentElement.attrs.name && group.attrs.type != "RESULT"){
        currentElement.cache();
        currentElement.filters([Konva.Filters.Grayscale]);
      }else{
        currentElement.filters([]);
      }
      
      currentElement.moveTo(group);
    } else {
      group = currentElement.getParent();
      currentElement.moveTo(layerRef.current);
      currentElement.filters([]);
    }
    stageRef.current.find(x=>x.attrs.id == "circle-text-result")[0].moveToTop();
    stageRef.current.find(x=>x.attrs.id == "quantity-result")[0].moveToTop();
    updateGroups();    
  }

  function checkFinish(trays){
    let finish = true;
    let group = stageRef.current.find('.group-RESULT');
    let shouldBe, result,quantityType1,quantityType2,okType1,okType2;
    if(mathOperator){
      switch(mathOperator){
        case "+":
          shouldBe = trays[0].expectedQuantity + trays[1].expectedQuantity;
          result = trays[2].quantity;
          quantityType1 = group[0].find(x=>x.attrs.name == trays[0].type).length;
          quantityType2 = group[0].find(x=>x.attrs.name == trays[1].type).length;
          okType1 = quantityType1 == trays[0].expectedQuantity;
          okType2 = quantityType2 == trays[1].expectedQuantity;
          finish = result == shouldBe && okType1 && okType2;
          break;
        case "-":
          shouldBe = trays[0].expectedQuantity - trays[1].expectedQuantity;
          result = trays[2].quantity;
          quantityType1 = group[0].find(x=>x.attrs.name == trays[0].type).length;
          quantityType2 = group[0].find(x=>x.attrs.name == trays[1].type).length;
          okType1 = quantityType1 == trays[0].expectedQuantity;
          okType2 = quantityType2 == trays[1].expectedQuantity;
          finish = result == shouldBe && okType1 && okType2;
          break;
        case "x":
          shouldBe = trays[0].expectedQuantity * trays[1].expectedQuantity;
          result = trays[2].quantity;
          quantityType1 = group[0].find(x=>x.attrs.name == trays[0].type).length;
          quantityType2 = group[0].find(x=>x.attrs.name == trays[1].type).length;
          okType1 = quantityType1 == trays[0].expectedQuantity;
          okType2 = quantityType2 == trays[1].expectedQuantity;
          finish = result == shouldBe && okType1 && okType2;
          break
        case "%":
          shouldBe = trays[0].expectedQuantity / trays[1].expectedQuantity;
          result = trays[2].quantity;
          quantityType1 = group[0].find(x=>x.attrs.name == trays[0].type).length;
          quantityType2 = group[0].find(x=>x.attrs.name == trays[1].type).length;
          okType1 = quantityType1 == trays[0].expectedQuantity;
          okType2 = quantityType2 == trays[1].expectedQuantity;
          finish = result == shouldBe && okType1 && okType2;
          break;
      }
    }else{
      trays.forEach(x=>{
        if(x.quantity != x.expectedQuantity)
          finish = false;
      });
    }

    return finish;
  }

  function updateGroups() {
    let copyofTrays = trays.map((x) => {
      let group = stageRef.current.find('.group-' + x.type);
      let elementsOfType = x.type == "RESULT" ? group[0].find(x=>x.attrs.id.startsWith("element")) : group[0].find('.' + x.type);      
      let newQuantity = elementsOfType.length;
      return { ...x, quantity: newQuantity };
    });
    setTrays(copyofTrays);
    if(checkFinish(copyofTrays)){
      playAudio(celebrateMp3, setPlaying, audioRef);
      setShowConfites(true);
    }
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
          {mathOperator && trays && trays.map((tray,index,array) => {
            return index < array.length-1 ? (<Text id={'operator'} text={index == 0 ? mathOperator : "="} x={getAllingX(tray.width, index, array.length, width) + tray.width + 20} y={180}  fontVariant='bold' fontSize={49} align='center' verticalAlign='middle' strokeWidth={1} fill='black' shadowColor='white' shadowBlur={10} />) : <></>
          })}
          <TrayGroup trays={trays} width={width} />
          {elements && getTypes(elements).map((type) => (
            <KonvaImage id="basket" x={type.x-20} y={type.y} width={type.width+50} height={type.height+30} image={imageFactory(Basket)}></KonvaImage>
          ))}
          {elements && elements.map((element, index) => (                 
            <KonvaImage id={'element-' + index} name={element.type} onDragStart={() => moveTop(index)} onDragEnd={() => updateTrayQuantity(index, element)} onMouseOver={() => handleOnMouseOver(index)} onMouseOut={() => handleOnMouseOut()} onDragMove={(e) => fixElementIntoStage(e)} scaleX={element.isOnMouseUp ? 1.2 : 1} scaleY={element.isOnMouseUp ? 1.2 : 1} key={element.id} x={element.x} y={element.y} width={element.width} height={element.height} image={imageFactory(element.src)} draggable={element.draggable} />                  
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
