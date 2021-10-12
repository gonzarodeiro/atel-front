import React, { useEffect, useState } from 'react';
import { Group, Image as KonvaImage, Text } from 'react-konva';
import { imageFactory } from '../commons/imageFactory';
import correctLetter from '../images/correctLetter.png';
import incorrectLetter from '../images/incorrectLetter.png';
import emptyLetter from '../images/emptyLetter.png';
import Konva from 'konva';
import { clientEvents, sendMessage } from '../../../../utils/socketManager';

const Letters = ({ element, indexElement, letters, setCorrectElement, stageRef }) => {
  const MARGIN = 80,
    MARGIN_TOP = 80;
  const [lettersState, setLettersState] = useState();

  useEffect(() => {    
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
  

  const handleOnMouseOver = (i) => {
    setLettersState(
      lettersState.map((element, index) => {
        return {
          ...element,
          isOnMouseUp: i === index
        };
      })
    );
  };

  const handleOnMouseOut = (e) => {
    setLettersState(
      lettersState.map((element) => {
        return {
          ...element,
          isOnMouseUp: false
        };
      })
    );
  };

  const handleOnClick = (e, i) => {
    sendMessage(clientEvents.clickLetter + indexElement, i)
    let target = e.currentTarget.children[0];
    let greenIncrement = 5;

    function inputLetter(event) {
      let key = event.key;
      if (/[a-zA-Z]/.test(key) && key.length <= 1) {
        let wordIsCorrect = true;
        const newLettersState = lettersState.map((element, index) => {
          let newSrc = emptyLetter;
          if (i !== index) {
            if (element.letter.toUpperCase() !== element.letterInput.toUpperCase()) wordIsCorrect = false;
          } else {
            if (key.toUpperCase() !== element.letter.toUpperCase()) {
              newSrc = incorrectLetter;
              wordIsCorrect = false;
            } else {
              newSrc = correctLetter;
            }
          }

          return {
            ...element,
            letterInput: i === index ? key.toUpperCase() : element.letterInput,
            src: i === index ? newSrc : element.src
          };
        })
        sendMessage(clientEvents.setLetter + indexElement, newLettersState);
        setLettersState(newLettersState);

        let word = lettersState.map((x) => x.letter).join('');
        if (wordIsCorrect) setCorrectElement(word);
        let nextIndex = i + 1;
        if (nextIndex < word.length) {
          let nextLetter = stageRef.current.find((el) => el.attrs.id === 'group' + word + nextIndex)[0];
          nextLetter.fire('click');
        }
      }
      window.clearInterval(interval);
      target.clearCache();
      target.filters([]);
      document.removeEventListener('keydown', inputLetter);
    }
    document.addEventListener('keydown', inputLetter);

    let interval = window.setInterval(function () {
      document.addEventListener('click', (event) => {
        document.removeEventListener('keydown', inputLetter);
        window.clearInterval(interval);
        target.clearCache();
        target.filters([]);
      });
      target.cache();
      target.filters([Konva.Filters.RGB]);
      target.blue(255);
      target.red(131);
      target.green(Math.sin((greenIncrement += 0.1)) * 15 + 190);
    }, 10);
  };

  return (
    <>
      {lettersState &&
        lettersState.map((letter, index) => {
          return (
            <Group id={'group' + element.name + index} onClick={(e) => handleOnClick(e, index)} onMouseOut={() => handleOnMouseOut()} onMouseOver={() => handleOnMouseOver(index)}>
              <KonvaImage scaleX={letter.isOnMouseUp ? 1.2 : 1} scaleY={letter.isOnMouseUp ? 1.2 : 1} x={MARGIN + 50 + 60 * index} y={MARGIN_TOP + (MARGIN + 10) * indexElement} id={'letterImage' + element.name + letter} image={imageFactory(letter.src)} height={70} width={50} />
              <Text id={'letterImage' + element.name + letter} text={letter.letterInput} x={MARGIN + 55 + 60 * index} y={MARGIN_TOP + 10 + (MARGIN + 10) * indexElement} fontVariant='bold' fontSize={42} align='center' verticalAlign='middle' strokeWidth={1} fill='black' shadowColor='white' shadowBlur={10} />
            </Group>
          );
        })}
    </>
  );
};

export default Letters;
