import React, { useEffect, useState } from 'react';
let urlZoom = 'https://augustou.github.io/zoom-atel/#/zoom/';

const Zoom = ({ roomZoom }) => {
  const [room, setRoom] = useState();
  useEffect(() => {
    setRoom(urlZoom + roomZoom);
  }, []);

  return (
    <div>
      <iframe id='inlineFrameExample' title='Inline Frame Example' width='520' height='460' allow='camera *;microphone *' class='responsive-iframe' src={room}></iframe>
    </div>
  );
};

export default Zoom;
