import { operationTypes, containerTypes, fruits, animals } from './constants';
const dlOperations = [
  { id: 0, code: operationTypes.NONE, description: 'Ninguna' },
  { id: 1, code: operationTypes.ADD, description: 'Suma' },
  { id: 2, code: operationTypes.SUB, description: 'Resta' },
  { id: 3, code: operationTypes.MUL, description: 'Multiplicación' },
  { id: 4, code: operationTypes.DIV, description: 'División' }
];
const dlContainerCount = [
  { id: 1, code: 1, description: '1' },
  { id: 2, code: 2, description: '2' },
  { id: 3, code: 3, description: '3' },
  { id: 4, code: 4, description: '4' }
];
const dlContainerCapacity = [
  { id: 1, code: 1, description: '1' },
  { id: 2, code: 2, description: '2' },
  { id: 3, code: 3, description: '3' },
  { id: 4, code: 4, description: '4' },
  { id: 5, code: 5, description: '5' },
  { id: 6, code: 6, description: '6' },
  { id: 7, code: 7, description: '7' },
  { id: 8, code: 8, description: '8' },
  { id: 9, code: 9, description: '9' },
  { id: 10, code: 10, description: '10' }
];
const dlContainerTypes = [
  { id: 1, code: containerTypes.FRUIT, description: 'Frutas' },
  { id: 2, code: containerTypes.ANIMAL, description: 'Animales' }
];
const dlFruits = [
  { id: 1, code: fruits.BANANA, description: 'Bananas' },
  { id: 2, code: fruits.APPLE, description: 'Manzanas' },
  { id: 3, code: fruits.GRAPE, description: 'Uvas' },
  { id: 4, code: fruits.LEMON, description: 'Limones' },
  { id: 5, code: fruits.STRAWBERRY, description: 'Frutillas' }
];
const dlAnimals = [
  { id: 1, code: animals.CAT, description: 'Gato' },
  { id: 2, code: animals.GIRAFFE, description: 'Jirafa' },
  { id: 3, code: animals.ELEPHANT, description: 'Elefante' },
  { id: 4, code: animals.DOG, description: 'Perro' },
  { id: 5, code: animals.LION, description: 'Leon' }
];

export { dlOperations, dlContainerCount, dlContainerCapacity, dlContainerTypes, dlFruits, dlAnimals };
