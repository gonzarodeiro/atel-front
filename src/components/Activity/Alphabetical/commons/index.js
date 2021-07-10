const playAudio = (voice, setPlaying, audioRef) => {
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

export { playAudio, imageFactory, oposedColor };
