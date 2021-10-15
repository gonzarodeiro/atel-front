import React, { useEffect } from 'react';
import Activity from '../../../../../components/Activity/Boxes/studentLogic';
import handleJitsiResize from '../../../handleJitsiResize';

const Boxes = (props) => {
  useEffect(() => {
    handleJitsiResize('#boxes-jitsi', props.onJitsiLayout);
    const listener = window.addEventListener('resize', () => handleJitsiResize('#boxes-jitsi', props.onJitsiLayout));
    return () => window.removeEventListener('resize', listener);
  }, []);

  return (
    <React.Fragment>
      <div className='row'>
        <div className='pb-3 mt-2 col-md-8'>
          <Activity sessionId={props.sessionId} />
        </div>
        <div className='col-md-4' style={{ marginTop: '3px' }}>
          <div data-test='col'>
            <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Cámara del profesional
            </label>
          </div>
          <div id='boxes-jitsi' className='pb-3 mt-2 col-md-12' style={{ height: '200px' }} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Boxes;
