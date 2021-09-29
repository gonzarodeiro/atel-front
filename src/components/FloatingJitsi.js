import React from 'react';
import Jitsi from './Jitsi';

const FloatingJitsi = ({ roomId, name }) => {
  return <Jitsi roomId={roomId} userName={name} />;
};

export default FloatingJitsi;
