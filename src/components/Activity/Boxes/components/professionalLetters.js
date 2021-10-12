import React, { useEffect, useState } from 'react';
import { Group, Image as KonvaImage, Text } from 'react-konva';
import { imageFactory } from '../commons/imageFactory';
import emptyLetter from '../images/emptyLetter.png';

import { clientEvents, registerEvent } from '../../../../utils/socketManager';

const Letters = ({ element, indexElement, letters, setCorrectElement, stageRef }) => {
  const MARGIN = 80,
    MARGIN_TOP = 80;
  const [lettersState, setLettersState] = useState();

  useEffect(() => {
    registerEvent( (letters) => {
      setLettersState(letters);
    }, clientEvents.setLetter + indexElement );

    const lettersState = letters.map((element) => {
      return {
        letter: element,
        isOnMouseUp: false,
        letterInput: '',
        src: emptyLetter
      };
    });
    setLettersState(lettersState);
  }, []);


  return (
    <>
      {lettersState &&
        lettersState.map((letter, index) => {
          return (
            <Group id={'group' + element.name + index}>
              <KonvaImage scaleX={letter.isOnMouseUp ? 1.2 : 1} scaleY={letter.isOnMouseUp ? 1.2 : 1} x={MARGIN + 50 + 60 * index} y={MARGIN_TOP + (MARGIN + 10) * indexElement} id={'letterImage' + element.name + letter} image={imageFactory(letter.src)} height={70} width={50} />
              <Text id={'letterImage' + element.name + letter} text={letter.letterInput} x={MARGIN + 55 + 60 * index} y={MARGIN_TOP + 10 + (MARGIN + 10) * indexElement} fontVariant='bold' fontSize={42} align='center' verticalAlign='middle' strokeWidth={1} fill='black' shadowColor='white' shadowBlur={10} />
            </Group>
          );
        })}
    </>
  );
};

export default Letters;
