import React from 'react';
import { useParams } from 'react-router-dom';
import Jitsi from '../../components/Jitsi';

const StudentSession = () => {
  let { roomId } = useParams();
  let userName = roomId;
  let containerStyle = { width: '1072px', height: '550px' };

  return (
    <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid #cecbcb', marginTop: '20px' }}>
      <div className='container'>
        <div className='card-body pb-3'>
          <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Sesión con {roomId}
          </div>
          <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
            <div className='row'>
              <div className='pb-3 mt-2 col-md-9'>
                <Jitsi roomId={roomId} userName={userName} containerStyle={containerStyle}></Jitsi>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSession;
