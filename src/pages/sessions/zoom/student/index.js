import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Jitsi from '../../../../components/Jitsi';
import getResponseByFilters from '../../../../utils/services/get/getByFilters/getResponseByFilters';
import showAlert from '../../../../utils/commons/showAlert';
import status from '../../../../utils/enums/sessionStatus';
import End from '../../personal/student/meeting/End';
import { clientEvents, connect, registerEvent } from '../../../../utils/socketManager';

const ZoomStudentSession = () => {
  const [student, setStudent] = useState();
  const [meeting, showMeeting] = useState({ begin: false, end: false });
  const [showJitsi, setShowJitsi] = useState();
  const [session, setSession] = useState({ generalComments: '' });
  let { roomId } = useParams();

  useEffect(() => {
    connect(roomId);
    registerEvent(() => {
      showMeeting({ begin: false, end: true });
    }, clientEvents.finishSession);

    registerEvent(() => {
      showMeeting({ begin: true, end: false });
    }, clientEvents.beginSession);

    loadSessionStatus();
  }, []);

  function loadSessionStatus() {
    const fields = roomId.split('-');
    setStudent(fields[0]);
    checkSessionCreated(fields);
    showMeeting({ begin: true });
    setShowJitsi(true);
  }

  async function checkSessionCreated(fields) {
    const filters = { roomName: fields[0], sessionId: fields[1] };
    let result = await getResponseByFilters('https://atel-back-stg.herokuapp.com/session/ask-to-join', filters);
    if (result.data.status !== status.Created) {
      await showAlert('Error en la sesión', result.data.message, 'error');
      setShowJitsi(false);
    } else setShowJitsi(true);
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  return (
    <>
      <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid #cecbcb', marginTop: '20px' }}>
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-2 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              ¡ Hola, Bienvenido {student} !
            </div>
            {showJitsi && (
              <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
                <div className='row'>
                  <div className='pb-3 mt-2 col-md-12'>
                    {meeting.begin && <Jitsi roomId={roomId} userName={roomId} height='580px'></Jitsi>}
                    {meeting.end && <End session={session} handleChange={handleChange} />}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ZoomStudentSession;
