import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Jitsi from '../../../../components/Jitsi';
import getResponseByFilters from '../../../../utils/services/get/getByFilters/getResponseByFilters';
import showAlert from '../../../../utils/commons/showAlert';
import status from '../../../../utils/enums/sessionStatus';
import End from './meeting/End';
import Numerical from './tools/Numerical';
import Alphabetical from './tools/Alphabetical';
import Pictogram from './tools/Pictogram';
import { clientEvents, connect, registerEvent, sendMessage } from '../../../../utils/socketManager';
import ActivityWizard from '../../../../components/ActivityWizard';
import wizardVideo from '../../../../components/Activity/Alphabetical/video/wizard_480_1MB.mp4';
import Celebration, { celebrationType } from '../../../../components/Celebration';
const wizardTitle = 'Bienvenido';
const wizardButtonText = 'COMENZAR';
const wizardSteps = ['Clickeá', 'Mové', 'Volvé a clickear'];

const StudentSession = (props) => {
  const [student, setStudent] = useState();
  const [meeting, showMeeting] = useState({ begin: false, end: false });
  const [tools, showTools] = useState({ alphabetical: false, numerical: false, pictogram: false });
  const [showJitsi, setShowJitsi] = useState();
  const [session, setSession] = useState({ generalComments: '' });
  const [wizardVisible, showWizard] = useState(false);
  let { roomId } = useParams();

  useEffect(() => {
    connect(roomId);
    registerEvent(() => {
      showMeeting({ begin: false });
      showTools({ alphabetical: true });
      showWizard(true);
    }, clientEvents.initAlphabetical);

    registerEvent(() => {
      showMeeting({ begin: false, end: true });
      showTools({ alphabetical: false, numerical: false, pictogram: false });
      showWizard(false);
    }, clientEvents.finishSession);

    registerEvent(() => {
      showMeeting({ begin: true, end: false });
      showTools({ alphabetical: false, numerical: false, pictogram: false });
      showWizard(false);
    }, clientEvents.beginSession);

    registerEvent(() => {
      showWizard(false);
    }, clientEvents.closeActivityWizard);

    loadSessionStatus();
  }, []);

  function loadSessionStatus() {
    const fields = roomId.split('-');
    setStudent(fields[0]);
    checkSessionCreated(fields);
    showMeeting({ begin: true });
    showTools({ alphabetical: false });
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

  const handleWizardClick = useCallback(() => {
    sendMessage(clientEvents.closeActivityWizard);
    showWizard(false);
  }, []);

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
                    {tools.alphabetical && <Alphabetical props={props} />}
                    {tools.numerical && <Numerical props={props} />}
                    {tools.pictogram && <Pictogram props={props} />}
                    {meeting.end && <End session={session} handleChange={handleChange} />}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Celebration type={celebrationType.RECEIVER} />
      {wizardVisible && <ActivityWizard src={wizardVideo} title={wizardTitle} steps={wizardSteps} onCloseClick={handleWizardClick} closeButtonText={wizardButtonText} />}
    </>
  );
};

export default StudentSession;