import { v4 as uuidv4 } from "uuid";
import imgApple from "./images/fruits/fruit_apple.png";
import imgBanana from "./images/fruits/fruit_banana.png";
import imgCherry from "./images/fruits/fruit_cherry.png";
import imgGrape from "./images/fruits/fruit_grape.png";
import imgLemon from "./images/fruits/fruit_lemon.png";
import imgStrawberry from "./images/fruits/fruit_strawberry.png";

const data = {
  elements: [
    {
      id: uuidv4(),
      name: "Manzana",
      src: imgApple,
      width: 70,
      height: 70,
      draggable: true,
    },
    {
      id: uuidv4(),
      name: "Banana",
      src: imgBanana,
      width: 70,
      height: 70,
      draggable: true,
    },
    {
      id: uuidv4(),
      name: "Cereza",
      src: imgCherry,
      width: 70,
      height: 70,
      draggable: true,
    },
    {
      id: uuidv4(),
      name: "Uva",
      src: imgGrape,
      width: 70,
      height: 70,
      draggable: true,
    },
    {
      id: uuidv4(),
      name: "Limón",
      src: imgLemon,
      width: 70,
      height: 70,
      draggable: true,
    },
    {
      id: uuidv4(),
      name: "Frutilla",
      src: imgStrawberry,
      width: 70,
      height: 70,
      draggable: true,
    },
  ],
  colors: ["#DE8971", "#7B6079", "#A7D0CD", "#FFE9D6"],
};

const NotArrayParameterError = "randomizeArray(): parameter should be an array";

function randomizeArray(array) {
  if (Array.isArray(array)) {
    const items = [...array];
    items.sort(() => (Math.random() > 0.5 ? 1 : -1));
    return items;
  }
  throw Error(NotArrayParameterError);
}

const COUNT = 5;

function getRandomItems(elements) {
  const randomWords = randomizeArray(elements);
  return randomWords.slice(0, COUNT);
}

const radius = 15;
const colours = ["#fde132", "#009bde", "#ff6b00"];
let speedInit = 3;
let amplitudeIncrement = 100;
let amplitudeInit = 30;
let periodInit = 500;
let periodIncrement = 300;

//TODO no supe que pija hacer con esto, deberia tomarlo en teoria del divRef del index
const width = 679;
const height = 197;

function generateConfites(num, divRef) {
  var confites = [];
  for (var i = 0; i <= num; i++) {
    var ball = {
      x: Math.round(Math.random() * width),
      y: Math.round(Math.random() * height * 4) - (height * 8) / 2,
      radius: Math.random() * radius + 5,
      fill: colours[Math.floor(colours.length * Math.random())],
      draggable: false,
      opacity: 0.8,
    };
    confites.push({
      confite: ball,
      speed: Math.random() * speedInit + 5,
      centerX: ball.x,
      period: Math.random() * periodIncrement + periodInit,
      amplitude: Math.random() * amplitudeIncrement + amplitudeInit,
    });
  }
  console.log(confites);
  return confites;
}

const elementsToUse = getRandomItems(data.elements);
const elementsToUseReordered = getRandomItems(elementsToUse);

export default {
  generateConfites: generateConfites,
  elements: elementsToUse,
  elementsReordered: elementsToUseReordered,
  colors: getRandomItems(data.colors),
};
