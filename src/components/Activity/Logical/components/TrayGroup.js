import React from 'react';
import {Group, Image as KonvaImage, Text,Circle}from 'react-konva';
import { imageFactory } from '../commons/imageFactory';

const TrayGroup = ({trays, width}) =>{

  function getAllingX(elementWidth, index, arrayLenght){  
    var stageWidth = width;    
    var relativeStageWidth = stageWidth / arrayLenght;
    var middleRelative = relativeStageWidth / 2;
    var offset = relativeStageWidth * (index);
    var x = (middleRelative) - (elementWidth/2) + offset;    
    return Math.round(x);
  }

  return (
    <>
    {trays &&
      trays.map((element, index, array) => (
        <Group type={element.type}>
          <KonvaImage id={"tray-"+index} name={element.id} key={element.id} x={getAllingX(element.width, index, array.length)} y={150} width={element.width} height={element.height} image={imageFactory(element.src)} />
          <Text id={'quantity' + element.id} text={element.quantity} x={getAllingX(element.width, index, array.length) - 20} y={240}  height={20} width={20} fontVariant='bold' fontSize={24} align='center' verticalAlign='middle' strokeWidth={1} fill='white' shadowColor='black' shadowBlur={10} />
          <Circle x={getAllingX(element.width, index, array.length) + element.width/2} y={240} radius={25} fill="white" stroke="black" />
          <KonvaImage x={getAllingX(element.width, index, array.length) + element.width/2 -17} y={220} width={30} height={40} image={imageFactory(element.srcType)} />
          <Text id={'expectedQuantity' + element.id} text={element.expectedQuantity} x={getAllingX(element.width, index, array.length) + element.width} y={240}  height={20} width={20} fontVariant='bold' fontSize={24} align='center' verticalAlign='middle' strokeWidth={1} fill='white' shadowColor='black' shadowBlur={10} />             
        </Group>
        )
      )
    }
    </>
  );
};

export default TrayGroup;