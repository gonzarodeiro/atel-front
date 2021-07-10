import Konva from 'konva';

let finalyConfites, animConfites;

function startAnimationConfites(stageRef, layerRef) {
  let confites = generateConfites(100);
  let confitesTemp = stageRef.current.find('#circle');
  finalyConfites = confitesTemp.map((element, index) => ({
    circle: element,
    ...confites[index]
  }));
  finalyConfites.forEach((element, index) => {
    element.circle.position({
      x: confites[index].confite.x,
      y: confites[index].confite.y
    });
  });
  animConfites = new Konva.Animation(function (frame) {
    updateConfites(frame);
  }, layerRef.current);
  animConfites.start();
}

function updateConfites(frame) {
  finalyConfites.forEach((element) => {
    let x = element.circle.x();
    let y = element.circle.y();
    y += element.speed;
    x = element.amplitude * Math.sin(frame.time / element.period) + element.centerX;
    element.circle.position({ x: x, y: y });
  });
  if (frame.time > 6000) animConfites.stop();
}

function generateConfites(num) {
  const radius = 15,
    colours = ['#fde132', '#009bde', '#ff6b00'],
    width = 679,
    height = 197,
    speedInit = 3,
    amplitudeIncrement = 100,
    amplitudeInit = 30,
    periodInit = 500,
    periodIncrement = 300;

  let confites = [];

  for (let i = 0; i <= num; i++) {
    let ball = {
      x: Math.round(Math.random() * width),
      y: Math.round(Math.random() * height * 4) - (height * 8) / 2,
      radius: Math.random() * radius + 5,
      fill: colours[Math.floor(colours.length * Math.random())],
      draggable: false,
      opacity: 0.8
    };
    confites.push({
      confite: ball,
      speed: Math.random() * speedInit + 5,
      centerX: ball.x,
      period: Math.random() * periodIncrement + periodInit,
      amplitude: Math.random() * amplitudeIncrement + amplitudeInit
    });
  }
  return confites;
}

function getRandomItems(elements) {
  const COUNT = 5;
  const randomWords = randomizeArray(elements);
  return randomWords.slice(0, COUNT);
}

function randomizeArray(array) {
  if (Array.isArray(array)) {
    const items = [...array];
    items.sort(() => (Math.random() > 0.5 ? 1 : -1));
    return items;
  }
}

export { startAnimationConfites, generateConfites, getRandomItems };
