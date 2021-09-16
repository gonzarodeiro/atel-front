import React from 'react';
import Jitsi from './Jitsi';

const FloatingJitsi = ({ roomId, sessionId }) => {
  return <Jitsi roomId={roomId + '-' + sessionId} userName={sessionStorage.getItem('name')} />;
};

export default FloatingJitsi;
