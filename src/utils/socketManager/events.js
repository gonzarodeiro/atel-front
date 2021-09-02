const clientEvents = {
  initAlphabetical: 'init-alphabetical',
  initNumerical: 'init-numerical',
  initPictograms: 'init-pictograms',
  resetActivity: 'resetActivity',
  beginSession: 'beginSession',
  finishSession: 'finishSession',
  onMouseMove: 'onMouseMove',
  setConfiguration: 'setConfiguration',
  onLeftItemClick: 'onLeftItemClick',
  targetMatch: 'targetMatch',
  playAudio: 'playAudio',
  studentPointer: 'studentPointer',
  showActivityWizard: 'show-activity-wizard',
  closeActivityWizard: 'close-activity-wizard',
  showCelebration: 'show-celebration',
  closeCelebration: 'close-celebration',
  elementPosition: 'element-position',
  updateTrayQuantity: 'update-tray-quantity'
};

const serverEvents = {
  joinRoom: 'join-room',
  customMessage: 'custom-message'
};

export { clientEvents, serverEvents };
