import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Begin from './Begin';
import getResponseByFilters from '../../../../utils/services/get/getByFilters/getResponseByFilters';
import showAlert from '../../../../utils/commons/showAlert';
import status from '../../../../utils/enums/sessionStatus';
import End from '../../personal/student/meeting/End';
import { clientEvents, connect, registerEvent } from '../../../../utils/socketManager';
import { BASE_URL } from '../../../../config/environment';
import Loading from '../../../../components/Loading';
import FloatingJitsi from '../../../../components/FloatingJitsi';


const ZoomStudentSession = () => {
  const [roomZoom, setRoomZoom] = useState();
  const [student, setStudent] = useState();
  const [meeting, showMeeting] = useState({ begin: false, end: false });
  const [showJitsi, setShowJitsi] = useState();
  const [showJitsiDiv, setShowJitsiDiv] = useState(true);
  const [session, setSession] = useState({ generalComments: '' });
  const [roomJitsi, setRoomJitsi] = useState();  
  const [loading, setShowLoading] = useState(true);
  let { roomId } = useParams();

  const [jitsiLayout, setJitsiLayout] = useState();
  const [zoomLayout, setZoomLayout] = useState();
  const [defaultLayout, setDefaultLayout] = useState(true);


  useEffect(() => {    
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);    
    registerEvent(() => {
      showMeeting({ begin: false, end: true });
    }, clientEvents.finishSession);

    registerEvent(() => {
      showMeeting({ begin: true, end: false });
    }, clientEvents.beginSession);
    
    loadSessionStatus();
    
    registerEvent((layout) => {
      debugger;
      switch(layout){
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
    }, clientEvents.inclusionLayout);
  }, []);

  function loadSessionStatus() {
    const fields = roomId.split('-');
    const room = fields[0] + '-' + fields[1] + '-' + fields[2];
    setRoomJitsi(fields[2] + '-' + fields[3]);
    connect(fields[2] + '-' + fields[3]);
    setStudent(fields[2]);
    checkSessionCreated(fields);
    setRoomZoom(room);
    showMeeting({ begin: true });
    setShowJitsi(true);
  }

  async function checkSessionCreated(fields) {
    const filters = { roomName: fields[2], sessionId: fields[3] };
    let result = await getResponseByFilters(`${BASE_URL}/session/ask-to-join`, filters);
    if (result.data.status !== status.Created) {
      await showAlert('Error en la sesión', result.data.message, 'error');
      setShowJitsi(false);
    } else setShowJitsi(true);
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  function handleJitsiLayout(layout) {        
    if (!layout) {
      setShowJitsiDiv(false);
      return;
    }

    const htmlElement = document.querySelector('#jitsi-iframe');
    if (!htmlElement) return;
    htmlElement.style.position = 'absolute';
    htmlElement.style.left = `${layout.rect.x}px`;
    htmlElement.style.top = `${layout.rect.y}px`;
    htmlElement.style.width = `${layout.width}px`;
    htmlElement.style.height = `${layout.height}px`;
  }


  return (
    <>
      <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid #cecbcb', marginTop: '20px' }}>
        {loading && (
          <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
            <Loading />
          </div>
        )}
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-2 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              ¡ Hola, Bienvenido {student}!
            </div>
            {showJitsi && (
              <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
                <div className='row'>
                  <div className='pb-3 mt-2 col-md-12'>
                    {meeting.begin && <Begin roomZoom={roomZoom}  onJitsiLayout={handleJitsiLayout} jitsiLayout={jitsiLayout} zoomLayout={zoomLayout} defaultLayout={defaultLayout} />}
                    {meeting.end && <End session={session} handleChange={handleChange} />}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {roomJitsi && student && showJitsiDiv && <div id="index-jitsi"><FloatingJitsi roomId={roomJitsi} name={student}/></div>}
    </>
  );
};

export default ZoomStudentSession;
