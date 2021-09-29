import React, { useEffect, useState } from 'react';
let urlZoom = 'https://augustou.github.io/zoom-atel/#/zoom/';

const Zoom = ({ roomZoom, height, width }) => {
  const [room, setRoom] = useState();
  useEffect(() => {
    setRoom(urlZoom + roomZoom);
  }, []);

  return (
    <div>
      <iframe id='inlineFrameExample' title='Inline Frame Example' width={width??'520'} height={height??'500'} allow='camera *;microphone *' class='responsive-iframe' src={room}></iframe>
    </div>
  );
};

export default Zoom;
