import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const jitsiModes = {
  PROFESSIONAL: 0,
  STUDENT: 1
};

const professionalToolbarButtons = ['microphone', 'camera', 'desktop', 'profile', 'settings', 'select-background', 'sharedvideo', 'mute-everyone', 'mute-video-everyone', 'participants-pane'];
const studentToolbarButtons = ['microphone', 'camera', 'desktop', 'profile', 'settings', 'select-background'];

const Jitsi = forwardRef((props, ref) => {
  let api = {};
  const domain = 'meet.jit.si';
  let history = useHistory();

  useEffect(() => {
    window.JitsiMeetExternalAPI ? startMeet() : alert('JitsiMeetExternalAPI not loaded');
  }, []);

  const startMeet = () => {
    const toolbarButtons = props.mode === jitsiModes.PROFESSIONAL ? professionalToolbarButtons : studentToolbarButtons;
    const options = {
      roomName: props.roomId,
      configOverwrite: { prejoinPageEnabled: false, disableDeepLinking: true, defaultLanguage: 'es', toolbarButtons: toolbarButtons },
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
    <div id='jitsi-container'>
      <div id='jitsi-iframe' style={{ width: '100%', height: '100%' }} />
    </div>
  );
});

export default Jitsi;
