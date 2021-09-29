import React, { useEffect, useState } from 'react';
import Zoom from '../../../../components/Zoom';
import handleJitsiResize from '../../handleJitsiResize';
import { registerEvent, clientEvents, connect } from '../../../../utils/socketManager';

const Begin = ({ roomZoom, onJitsiLayout, roomJitsi }) => {
  const [jitsiLayout, setJitsiLayout] = useState();
  const [zoomLayout, setZoomLayout] = useState();
  const [defaultLayout, setDefaultLayout] = useState(true);

  useEffect(() => {
    connect(roomJitsi);
    registerEvent((layout) => {
      switch (layout) {
        case 0:
          setJitsiLayout(false);
          setZoomLayout(false);
          setDefaultLayout(true);
          break;
        case 1:
          setZoomLayout(false);
          setJitsiLayout(true);
          setDefaultLayout(false);
          break;
        case 2:
          setDefaultLayout(false);
          setZoomLayout(true);
          setJitsiLayout(false);
          break;
        default:
      }
      handleJitsiResize('#begin-jitsi', onJitsiLayout);
    }, clientEvents.inclusionLayout);

    const listener = window.addEventListener('resize', () => handleJitsiResize('#begin-jitsi', onJitsiLayout));
    return () => window.removeEventListener('resize', listener);
  }, []);

  useEffect(() => {
    handleJitsiResize('#begin-jitsi', onJitsiLayout);
  }, [jitsiLayout, zoomLayout, defaultLayout]);

  return (
    <React.Fragment>
      {defaultLayout && (
        <>
          <div className='row'>
            <div className='pb-2 col-md-6 mt-3 mb-1'>
              <Zoom roomZoom={roomZoom} height={'550px'} width={'640px'} />
            </div>
            <div id='begin-jitsi' className='pb-2 col-md-6 mt-3 mb-1' style={{ height: '550px' }}></div>
          </div>
        </>
      )}
      {jitsiLayout && (
        <>
          <div id='begin-jitsi' className='pb-3 mt-2 col-md-12' style={{ height: '580px' }} />
        </>
      )}
      {zoomLayout && (
        <>
          <div className='mt-1'>
            <Zoom roomZoom={roomZoom} height={'600px'} width={'1335px'} />
          </div>
          <div>
            <div id='begin-jitsi' style={{ height: '0px' }} />
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Begin;
