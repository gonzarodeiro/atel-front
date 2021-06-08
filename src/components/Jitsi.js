import React, { forwardRef, useImperativeHandle, useEffect } from 'react';

const Jitsi = forwardRef((props, ref) => {
  useEffect(() => {
    window.JitsiMeetExternalAPI ? startMeet() : alert('JitsiMeetExternalAPI not loaded');
  });

  let containerStyle = props.containerStyle ?? {
    width: '400px',
    height: '350px'
  };

  const jitsiContainerStyle = {
    width: '100%',
    height: '100%'
  };
  let api = {};
  const domain = 'meet.jit.si';

  const startMeet = () => {
    const options = {
      roomName: props.roomId,
      configOverwrite: { prejoinPageEnabled: false },
      configOverwrite: {
        //Necesario para version mobile
        disableDeepLinking: true,
        prejoinPageEnabled: false
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: { displayName: props.userName }
    };
    api = new window.JitsiMeetExternalAPI(domain, options);

    api.addEventListeners({
      readyToClose: handleClose,
      videoConferenceLeft: handleVideoConferenceLeft
    });
  };

  const handleClose = () => {
    console.log('handleClose');
  };

  const handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    // Podemos hacer el redirect, y guardar datos de la session (a definir)
    api.dispose();
  };

  //Pruebas
  useImperativeHandle(ref, () => ({
    resizeJitsi(height, width) {
      api.resizeLargeVideo(700, 700);
      //height = '700px';
    }
    // getAlert() {
    //   alert('getAlert from Child');
    // }
  }));
  //

  return (
    <>
      <div style={containerStyle}>
        <div id='jitsi-iframe' style={jitsiContainerStyle} />
      </div>
    </>
  );
});

//<div style={{ height: height, width: width }} id='jitsi-iframe'></div>

export default Jitsi;
