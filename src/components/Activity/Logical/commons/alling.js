export const getAllingX = (elementWidth, index, arrayLenght, width) => {
  let stageWidth = width;
  let relativeStageWidth = stageWidth / arrayLenght;
  let middleRelative = relativeStageWidth / 2;
  let offset = relativeStageWidth * index;
  let x = middleRelative - elementWidth / 2 + offset;
  return Math.round(x);
}

