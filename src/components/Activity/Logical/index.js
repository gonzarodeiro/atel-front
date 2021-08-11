import React, {useRef, useEffect, useState} from 'react';
import { Stage } from 'react-konva';

const Logical = () => {
  const defaultColor = '#8896AB'; 
  const CONTAINER_SIZE = '100%';
  const divRef = useRef(null);
  const stageRef = useRef(null);
  
  const [{ width, height }, setDimensions] = useState({});

  useEffect(() =>{
    setResolution();
  },[]);

  function setResolution() {
    let rect = divRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    setDimensions({ width, height });  
  }

  return (
    <div style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE,backgroundColor: defaultColor }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>

      </Stage>
    </div>
  )
};

export default Logical;
