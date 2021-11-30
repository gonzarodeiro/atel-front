const clientEvents = {
  initAlphabetical: 'init-alphabetical',
  initNumerical: 'init-numerical',
  initPictograms: 'init-pictograms',
  initBoxes: 'init-boxes',
  resetActivity: 'resetActivity',
  beginSession: 'beginSession',
  finishSession: 'finishSession',
  onMouseMove: 'onMouseMove',
  setConfiguration: 'setConfiguration',
  setAlphabeticConfiguration: 'setAlphabeticConfiguration',
  onLeftItemClick: 'onLeftItemClick',
  targetMatch: 'targetMatch',
  playAudio: 'playAudio',
  studentPointer: 'studentPointer',
  showActivityWizard: 'show-activity-wizard',
  closeActivityWizard: 'close-activity-wizard',
  showCelebration: 'show-celebration',
  closeCelebration: 'close-celebration',
  elementPosition: 'element-position',
  trays: 'trays',
  setFilter: 'setFilter',
  checkResults: 'check-results',
  showPictogramStripe: 'show-pictogram-stripe',
  reloadPictogramsTemplate: 'reload-pictograms-template',
  inclusionLayout: 'inclusionLayout',
  setLetter: 'setLetter',
  clickLetter: 'clickLetter',
  clearIntervals: 'clearIntervals',
  showConfitesAlphabeticals: "showConfitesAlphabeticals",
  showConfitesBoxes: "showConfitesBoxes"
};

const serverEvents = {
  joinRoom: 'join-room',
  customMessage: 'custom-message'
};

export { clientEvents, serverEvents };
