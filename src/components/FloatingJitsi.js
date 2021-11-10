import React from 'react';
import Jitsi from './Jitsi';

const FloatingJitsi = ({ roomId, name, mode }) => {
  return <Jitsi roomId={roomId} userName={name} mode={mode} />;
};

export default FloatingJitsi;
