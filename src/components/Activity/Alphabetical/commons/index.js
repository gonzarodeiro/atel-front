const playAudio = (voice, setPlaying, audioRef) => {
  if (!audioRef || !audioRef.current) {
    return;
  }
  setPlaying(voice);
  audioRef.current.pause();
  audioRef.current.load();
  audioRef.current.play();
};

function imageFactory(x) {
  const rv = document.createElement('img');
  rv.src = x;
  return rv;
}

function oposedColor(color) {
  const aux = color.substring(1);
  const hex = '0x' + aux;
  const num = parseInt(hex);
  const comp = parseInt('0xffffff') - num;
  return '#' + comp.toString(16) + 'ff';
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

export { playAudio, imageFactory, oposedColor, getRandomItems };
