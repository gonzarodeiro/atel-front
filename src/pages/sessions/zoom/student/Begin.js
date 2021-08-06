import React from 'react';
import Jitsi from '../../../../components/Jitsi';
import Zoom from '../../../../components/Zoom';

const Begin = ({ roomId, roomZoom }) => {
  return (
    <React.Fragment>
      <div className='row'>
        <div className='pb-2 col-md-6 mt-3 mb-2'>
          <Zoom roomZoom={roomZoom} />
        </div>
        <div className='pb-2 col-md-6 mt-3 mb-2'>
          <Jitsi roomId={roomId} userName={roomId} height='460px' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Begin;
