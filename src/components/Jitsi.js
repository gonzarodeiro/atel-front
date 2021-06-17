import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Jitsi = forwardRef((props, ref) => {
  let containerStyle = { height: props.height };
  let api = {};
  const domain = 'meet.jit.si';
  let history = useHistory();

  useEffect(() => {
    window.JitsiMeetExternalAPI ? startMeet() : alert('JitsiMeetExternalAPI not loaded');
  }, []);

  const startMeet = () => {
    const options = {
      roomName: props.roomId,
      configOverwrite: { prejoinPageEnabled: false, disableDeepLinking: true, defaultLanguage: 'es', toolbarButtons: ['microphone', 'camera', 'desktop', 'hangup', 'profile', 'settings', 'invite', 'select-background', 'download', 'mute-everyone', 'mute-video-everyone'] },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: { displayName: props.userName }
    };
    api = new window.JitsiMeetExternalAPI(domain, options);

    api.addEventListeners({ readyToClose: handleClose, videoConferenceLeft: handleVideoConferenceLeft });
  };

  const handleClose = () => {
    console.log('handleClose');
  };

  const handleVideoConferenceLeft = () => {
    api.dispose();
    history.push({ pathname: 'home' });
  };

  useImperativeHandle(ref, () => ({
    resizeJitsi(height, width) {
      api.resizeLargeVideo(700, 700);
      //height = '700px';
    }
    // getAlert() {
    //   alert('getAlert from Child');
    // }
  }));

  return (
    <div style={containerStyle}>
      <div id='jitsi-iframe' style={{ width: '100%', height: '100%' }} />
    </div>
  );
});

export default Jitsi;
