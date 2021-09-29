const playAudio = (voice, setPlaying, audioRef) => {
  if (!audioRef || !audioRef.current) {
    return;
  }
  setPlaying(voice);
  audioRef.current.pause();
  audioRef.current.load();
  audioRef.current.play();
};

export {playAudio}