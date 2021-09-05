import React from 'react'
import Jitsi from '../../../../../components/Jitsi';
import Activity from '../../../../../components/Activity/Logical/studentLogic';

const Numerical = (props) =>{

    return (
        <React.Fragment>
          <div className='row'>
            <div className='pb-3 mt-2 col-md-8'>
              <Activity sessionId={props.sessionId}/>
            </div>
            <div className='col-md-4' style={{ marginTop: '3px' }}>
              <div data-test='col'>
                <label className='mb-1' style={{ fontSize: '13px', fontWeight: 'bold' }}>
                  Cámara del profesional
                </label>
              </div>
              <Jitsi roomId={props.roomId} userName={props.userName} height='200px' />
            </div>
          </div>
        </React.Fragment>
      );
}

export default Numerical;