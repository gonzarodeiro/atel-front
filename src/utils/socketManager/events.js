const clientEvents = {
  initAlphabetical: 'init-alphabetical',
  initNumerical: 'init-numerical',
  initPictograms: 'init-pictograms',
  resetActivity: 'resetActivity',
  finishSession: 'finishSession',
  onMouseMove: 'onMouseMove',
  setConfiguration: 'setConfiguration',
  onLeftItemClick: 'onLeftItemClick',
  targetMatch: 'targetMatch',
  playAudio: 'playAudio'
};

const serverEvents = {
  joinRoom: 'join-room',
  customMessage: 'custom-message'
};

export { clientEvents, serverEvents };
