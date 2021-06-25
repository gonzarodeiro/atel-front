import confitesFactory from "./alphabetical-data";
import Konva from "konva";

let finalyConfites;
let animConfites;
const startAnimationConfites = (stageRef, layerRef) => {
  //generamos confites aleatoriamente
  let confites = confitesFactory.generateConfites(100);

  //obtenemos los componentes confites generados en el stage
  let confitesTemp = stageRef.current.find("#circle");

  //seteamos posicion inicial de los confites en base a lo que se genero aleatoriamente
  finalyConfites = confitesTemp.map((element, index) => ({
    circle: element,
    ...confites[index],
  }));
  finalyConfites.forEach((element, index) => {
    element.circle.position({
      x: confites[index].confite.x,
      y: confites[index].confite.y,
    });
  });

  //ejecutamos la animacion( funciona como si fuera un ciclo while, la funcion updateConfites se ejecuta N veces )
  animConfites = new Konva.Animation(function (frame) {
    updateConfites(frame);
  }, layerRef.current);

  animConfites.start();
};

function updateConfites(frame) {
  // por cada componente confite que tengamos seteamos si nueva posicion
  finalyConfites.forEach((element) => {
    let x = element.circle.x();
    let y = element.circle.y();
    y += element.speed;
    x =
      element.amplitude * Math.sin(frame.time / element.period) +
      element.centerX;
    element.circle.position({ x: x, y: y });
  });

  // pasado los 6 segundos de animacion la frenamos
  if (frame.time > 6000) {
    animConfites.stop();
  }
}
export default startAnimationConfites;
