import React from 'react';
import { Group, Image as KonvaImage, Text, Circle } from 'react-konva';
import { imageFactory } from '../commons/imageFactory';
import { getAllingX } from '../commons/alling';

const TrayGroup = ({ trays, width }) => {

  return (
    <>
      {trays &&
        trays.map((element, index, array) => {
          if(element.type != "RESULT"){
            return (
              <Group type={element.type} name={'group-' + element.type} height={180}>
                <KonvaImage id={'tray-' + index} name={element.id} key={element.id} x={getAllingX(element.width, index, array.length, width)} y={130} width={element.width} height={element.height} image={imageFactory(element.src)} />
                <Text id={'quantity' + element.id} text={element.quantity} x={getAllingX(element.width, index, array.length, width) - 20} y={240} height={20} width={20} fontVariant='bold' fontSize={25} align='center' verticalAlign='middle' strokeWidth={1} fill='black' shadowColor='white' shadowBlur={10} />
                {element.srcType && <Circle id='circle-text' x={getAllingX(element.width, index, array.length,width) + element.width / 2} y={240} radius={25} fill='white' stroke='black' />}
                {element.srcType && <KonvaImage id='imageType' x={getAllingX(element.width, index, array.length, width) + element.width / 2 - 15} y={220} width={30} height={40} image={imageFactory(element.srcType)} />}
                <Text id={'expectedQuantity' + element.id} text={element.expectedQuantity} x={getAllingX(element.width, index, array.length, width) + element.width} y={240} height={20} width={20} fontVariant='bold' fontSize={25} align='center' verticalAlign='middle' strokeWidth={1} fill='black' shadowColor='white' shadowBlur={10} />
              </Group>
            )
          }else{
            return(
              <Group type={element.type} name={'group-' + element.type}>
                <KonvaImage id={'tray-' + index} name={element.id} key={element.id} x={getAllingX(element.width, index, array.length, width)} y={130} width={element.width} height={element.height} image={imageFactory(element.src)} />
                <Circle id='circle-text-result' x={getAllingX(element.width, index, array.length,width) + element.width / 2} y={240} radius={25} fill='white' stroke='black' />
                <Text id='quantity-result' text={element.quantity} x={getAllingX(element.width, index, array.length,width) + element.width / 2 - 10} y={235} height={20} width={20} fontVariant='bold' fontSize={25} align='center' verticalAlign='middle' strokeWidth={1} fill='black' shadowColor='white' shadowBlur={10} />
              </Group>
            );
          }
      })}
    </>
  );
};

export default TrayGroup;
