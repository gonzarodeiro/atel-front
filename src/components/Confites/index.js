import React, { useEffect, useRef, useState } from 'react';
import { Layer, Circle } from 'react-konva';

import { startAnimationConfites, generateConfites } from './confites';

const Confites = ({ stageRef }) => {
  const layerRef = useRef(null);
  const [confites] = useState(generateConfites());

  useEffect(() => {
    const layer = layerRef.current;
    const stage = stageRef.current;
    const ainmation = startAnimationConfites(stage, layer);
    return () => {
      ainmation.stop();
    };
  }, []);

  return <Layer ref={layerRef}>{confites && confites.map(({ confite }, index) => <Circle key={`circle_${index}`} id={'circle'} x={confite.x} y={confite.y} radius={confite.radius} fill={confite.fill} />)}</Layer>;
};

export default Confites;
