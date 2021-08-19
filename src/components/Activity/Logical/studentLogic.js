import React, {useRef, useEffect, useState} from 'react';
import { Stage,Layer, Image as KonvaImage } from 'react-konva';
import { generateTrays } from './commons/tray';
import { generateElements } from './commons/elements';
import { imageFactory } from './commons/imageFactory';
import TrayGroup from './components/TrayGroup'

const Logical = () => {
  const defaultColor = '#8896AB'; 
  const CONTAINER_SIZE = '100%';
  const divRef = useRef(null);
  const stageRef = useRef(null);  
  const layerRef = useRef(null);  
  
  const [{ width, height }, setDimensions] = useState({});
  const [trays,setTrays] = useState();
  const [elements,setElements] = useState();

  useEffect(() =>{    
    setConfiguration(); // will be register in socket event listener
  },[]);
  

  function setConfiguration(){
    let rect = divRef.current.getBoundingClientRect();
    const width = 700;
    const height = 500;
    setDimensions({ width, height });  
    setTrays(generateTrays());
    setElements(generateElements(width));
  }


  function updateTrayQuantity(index){    
    const point = stageRef.current.getPointerPosition();    
    const intersections = stageRef.current.getAllIntersections(point);        
    const currentElement = intersections.find((element) => element.attrs.id == "element-" + index);  
    const tray = intersections.find((element) => element.attrs.id.startsWith('tray'));    
    let group;
    updateElementsPositions(currentElement);
    if(tray){  
      group = tray.getParent();   
      currentElement.moveTo(group);         
    }else{
      group = currentElement.getParent();
      currentElement.moveTo(layerRef.current);     
    }
    updateGroups(); 
  }

  function updateGroups(){  
      var copyofTrays = trays.map( x => {          
        var group = stageRef.current.find(".group-" + x.type);
        var elementsOfType = group[0].find("." + x.type);
        var newQuantity = elementsOfType.length;        
        return {...x, quantity: newQuantity}
      });
      setTrays(copyofTrays);
  }


  function updateElementsPositions(currentElement){    
    var copyOfElements = [...elements];
    copyOfElements.map(element => {      
        if(element.id == currentElement.attrs.id)
          return {...element, x:element.x(), y:element.y()}
        return element;
      });
      setElements(copyOfElements);
  }

  const handleOnMouseOver = (i) => {    
    setElements(
      elements.map((element,index) => {
        return {
          ...element,
          isOnMouseUp: i === index,
        };
      })
    );
  }

  const handleOnMouseOut = (e) => {
    setElements(
      elements.map((element) => {
        return {
          ...element,
          isOnMouseUp: false,
        };
      })
    );
  };

  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE,backgroundColor: defaultColor }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer ref={layerRef}>
          <TrayGroup trays={trays} width={width}/>
          {elements &&
            elements.map((element, index) => (              
                <KonvaImage id={"element-" + index} 
                            name={element.type} 
                            onDragEnd={(e) => updateTrayQuantity(index,element)} 
                            onMouseOver={() => handleOnMouseOver(index)} 
                            onMouseOut={() => handleOnMouseOut()} 
                            scaleX={element.isOnMouseUp ? 1.2 : 1}
                            scaleY={element.isOnMouseUp ? 1.2 : 1}
                            key={element.id} x={element.x} y={element.y}                             
                            width={element.width} 
                            height={element.height} 
                            image={imageFactory(element.src)} 
                            draggable={element.draggable} 
                />              
              )
            )
          }
        </Layer>
      </Stage>
    </div>
  )
};

export default Logical;
