import React, { useEffect, useState } from 'react';
import { Group, Image as KonvaImage, Text } from 'react-konva';
import { imageFactory } from '../commons/imageFactory';
import emptyLetter from '../images/emptyLetter.png';
import { clientEvents, registerEvent, removeEventListener } from '../../../../utils/socketManager';
import Konva from 'konva';

let intervals = [];
let intents = 0;


const Letters = ({ element, indexElement, letters, setCorrectElement, stageRef }) => {
  const MARGIN = 80,
    MARGIN_TOP = 80;
  const [lettersState, setLettersState] = useState();

  useEffect(() => {    
    removeEventListener(clientEvents.clickLetter + indexElement);
    registerEvents();    
    const lettersState = letters.map((element) => {
      return {
        letter: element,
        isOnMouseUp: false,
        letterInput: '',
        src: emptyLetter
      };
    });
    
    setLettersState(lettersState);
  }, [element]);

  function registerEvents(){    

    registerEvent( () => {
      clearIntervals();
    }, clientEvents.clearIntervals );

    registerEvent( (letters) => {            
      setLettersState(letters);
    }, clientEvents.setLetter + indexElement );

    console.log("registro");
    registerEvent( (i) => {
      clearIntervals();
      let word = letters.map((x) => x).join('');        
      debugger;
      let target = stageRef.current.find((el) => el.attrs.id === 'group' + word + i)[0];        
      let greenIncrement = 5;
      let interval = window.setInterval(function () {              
        target.cache();
        target.filters([Konva.Filters.RGB]);
        target.blue(255);
        target.red(131);
        target.green(Math.sin((greenIncrement += 0.1)) * 15 + 190);
      }, 10);
      
      intervals.push(interval);
      
    }, clientEvents.clickLetter + indexElement );
  }

  function clearIntervals(){
    for ( var i = 0; i < intervals.length; ++i ){
      clearInterval( intervals[i] );      
    }
    let targets = stageRef.current.find((el) => el.attrs.id && el.attrs.id.startsWith('group'));        
    targets.forEach(x => {
      x.clearCache();
      x.filters([]);
    });
  }

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
