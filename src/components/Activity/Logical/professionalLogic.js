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
    const width = rect.width;
    const height = rect.height;
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
      group.add(currentElement);             
    }else{
      group = currentElement.getParent();
      currentElement.moveTo(layerRef.current);     
    }
    updateGroup(group); 
  }

  function updateGroup(group){
    
    var elementsOfType = group.find("." + group.attrs.type);
      var newQuantity = elementsOfType.length;
      var copyofTrays = trays.map( x => {        
        if(x.type == group.attrs.type)
          return {...x, quantity: newQuantity}
        return x;
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

  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE,backgroundColor: defaultColor }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer ref={layerRef}>
          <TrayGroup trays={trays} width={width}/>
          {elements &&
            elements.map((element, index) => (              
                <KonvaImage id={"element-" + index} name={element.type} onDragEnd={(e) => updateTrayQuantity(index,element)} key={element.id} x={element.x} y={element.y} width={element.width} height={element.height} image={imageFactory(element.src)} draggable={element.draggable} />              
              )
            )
          }
        </Layer>
      </Stage>
    </div>
  )
};

export default Logical;
