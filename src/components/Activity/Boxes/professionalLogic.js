import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer} from 'react-konva';

import Confites from '../../Confites';

import bkgnd from './images/background.jpg';

const Boxes = () => {
  const divRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);  
  const [{ width, height }, setDimensions] = useState({});    
  const [showConfites, setShowConfites] = useState(false);

  useEffect(() => {
    setDimensions({ width: 700, height: 492 });
  }, []);



  return (
    <div style={{ width: width, height: height, backgroundSize: 'cover', backgroundImage: `url("${bkgnd}")` }} ref={divRef}>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer ref={layerRef}>
          
        </Layer>
        {showConfites && <Confites stageRef={stageRef} />}
      </Stage>      
    </div>
  );
};

export default Boxes;
