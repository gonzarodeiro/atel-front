import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import getResponseByFilters from '../../../../utils/services/get/getByFilters/getResponseByFilters';
import showAlert from '../../../../utils/commons/showAlert';
import status from '../../../../utils/enums/sessionStatus';
import End from './meeting/End';
import Numerical from './tools/Numerical';
import Alphabetical from './tools/Alphabetical';
import { clientEvents, connect, registerEvent, sendMessage } from '../../../../utils/socketManager';
import ActivityWizard from '../../../../components/ActivityWizard';
import wizardVideo from '../../../../components/Activity/Alphabetical/video/wizard_480_1MB.mp4';
import Celebration, { celebrationType } from '../../../../components/Celebration';
import { BASE_URL } from '../../../../config/environment';
import Loading from '../../../../components/Loading';
import FloatingJitsi from '../../../../components/FloatingJitsi';
import handleJitsiResize from '../../handleJitsiResize';
import Stripe from '../../../../components/Activity/Pictograms/components/Stripe';
import Pictograms, { modalResults, pictogramModes } from '../../../../components/Activity/Pictograms';
import PictoFab from '../../../../components/Activity/Pictograms/components/PictoFab';

const wizardTitle = 'Bienvenido';
const wizardButtonText = 'COMENZAR';
const wizardSteps = ['Clickeá', 'Mové', 'Volvé a clickear'];

const StudentSession = () => {
  const [student, setStudent] = useState();
  const [meeting, showMeeting] = useState({ begin: false, end: false });
  const [tools, showTools] = useState({ alphabetical: false, numerical: false, pictogram: false });
  const [showJitsi, setShowJitsi] = useState(true);
  const [session, setSession] = useState({ generalComments: '' });
  const [wizardVisible, showWizard] = useState(false);
  const [loading, setShowLoading] = useState(true);
  const [sessionId, setSessionId] = useState(-1);
  const [showJitsiDiv, setShowJitsiDiv] = useState(true);
  const [pictogramsVisible, showPictograms] = useState(false);
  const [localStripe, setLocalStripe] = useState([]);
  const [remoteStripe, setRemoteStripe] = useState([]);
  const [remoteStripeVisible, setRemoteStripeVisible] = useState(false);
  const [isLocalStripeInForeground, setIsLocalStripeInForeground] = useState(false);
  const [senderName, setSenderName] = useState('');
  let { roomId } = useParams();

  useLayoutEffect(() => {
    handleJitsiResize('#init-jitsi', () => handleJitsiLayout);
    const listener = window.addEventListener('resize', () => handleJitsiResize('#init-jitsi', handleJitsiLayout));

    return () => window.removeEventListener('resize', listener);
  }, []);

  useEffect(() => {
    initializeJitsiDiv();
  }, [showJitsiDiv]);

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    connect(roomId);
    registerEvent(() => {
      setShowJitsiDiv(false);
      showMeeting({ begin: false });
      showTools({ alphabetical: true });
      showWizard(true);
    }, clientEvents.initAlphabetical);

    registerEvent(() => {
      setShowJitsiDiv(false);
      showMeeting({ begin: false });
      showTools({ numerical: true });
      showWizard(true);
    }, clientEvents.initNumerical);

    registerEvent(() => {
      handleJitsiLayout();
      setShowJitsi(false);
      setShowJitsiDiv(false);
      showMeeting({ begin: false, end: true });
      showTools({ alphabetical: false, numerical: false, pictogram: false });
      showWizard(false);
    }, clientEvents.finishSession);

    registerEvent(() => {
      setShowJitsiDiv(true);
      showMeeting({ begin: true, end: false });
      showTools({ alphabetical: false, numerical: false, pictogram: false });
      showWizard(false);
    }, clientEvents.beginSession);

    registerEvent(() => {
      showWizard(false);
    }, clientEvents.closeActivityWizard);

    registerEvent(({ stripe, visible, sender }) => {
      console.log('showPictogramStripe', stripe, visible, sender);
      setRemoteStripe(stripe);
      setRemoteStripeVisible(visible);
      setIsLocalStripeInForeground(false);
      setSenderName(sender);
    }, clientEvents.showPictogramStripe);

    loadSessionStatus();
  }, []);

  function loadSessionStatus() {
    const fields = roomId.split('-');
    setStudent(fields[0]);
    setSessionId(fields[1]);
    checkSessionCreated(fields);
    showMeeting({ begin: true });
    showTools({ alphabetical: false });
    setShowJitsi(true);
  }

  function initializeJitsiDiv() {
    handleJitsiResize('#init-jitsi', handleJitsiLayout);
  }

  async function checkSessionCreated(fields) {
    const filters = { roomName: fields[0], sessionId: fields[1] };
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

  const handleWizardClick = useCallback(() => {
    sendMessage(clientEvents.closeActivityWizard);
    showWizard(false);
  }, []);

  function handleJitsiLayout(layout) {
    if (!layout) {
      setShowJitsiDiv(false);
      return;
    }
    const htmlElement = document.querySelector('#jitsi-iframe');
    htmlElement.style.position = 'absolute';
    htmlElement.style.left = `${layout.rect.x}px`;
    htmlElement.style.top = `${layout.rect.y}px`;
    htmlElement.style.width = `${layout.width}px`;
    htmlElement.style.height = `${layout.height}px`;
  }

  useLayoutEffect(() => {
    if (!loading) {
      showPictogramStripeInForeground(true);
      setTimeout(() => {
        showPictogramStripeInForeground(false);
      }, 5000);
    }
  }, [localStripe]);

  function handleClosePictograms(mr, stripe) {
    if (mr === modalResults.OK) {
      if (isLocalStripeInForeground) {
        showPictogramStripeInForeground(false);
      }
      setLocalStripe([...stripe]);
    }
    showPictograms(false);
  }

  function handleDiscardRemotePictogramsClick() {
    if (isLocalStripeInForeground) {
      showPictogramStripeInForeground(false);
    } else {
      setRemoteStripeVisible(false);
    }
  }

  function showPictogramStripeInForeground(visible) {
    const sender = student;
    setSenderName(sender);
    setRemoteStripe(localStripe);
    setRemoteStripeVisible(visible);
    setIsLocalStripeInForeground(visible);
    sendMessage(clientEvents.showPictogramStripe, { stripe: localStripe, visible, sender });
  }

  return (
    <>
      <div className='card shadow-sm container px-0 mb-4 overflow-hidden' style={{ border: '1px solid #cecbcb', marginTop: '20px' }}>
        {loading && (
          <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
            <Loading />
          </div>
        )}
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-2 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              ¡ Hola, Bienvenido {student} !
            </div>
            {
              <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
                <div className='row'>
                  <div className='pb-3 mt-2 col-md-12'>
                    {showJitsiDiv && <div id='init-jitsi' className='pb-3 mt-2 col-md-12' style={{ height: '580px' }}></div>}
                    {tools.alphabetical && <Alphabetical roomId={roomId} userName={student} onJitsiLayout={handleJitsiLayout} />}
                    {tools.numerical && <Numerical sessionId={sessionId} roomId={roomId} userName={student} onJitsiLayout={handleJitsiLayout} />}
                    {meeting.end && <End session={session} handleChange={handleChange} />}
                  </div>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
      {showJitsi && <FloatingJitsi roomId={roomId} name={student} />}
      <PictoFab onClick={() => showPictograms(true)} />
      <Celebration type={celebrationType.RECEIVER} />
      {wizardVisible && tools.alphabetical && <ActivityWizard src={wizardVideo} title={wizardTitle} steps={wizardSteps} onCloseClick={handleWizardClick} closeButtonText={wizardButtonText} />}
      {remoteStripeVisible && (
        <div className='fade-in' style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(0,0,0, 0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <i className='fas fa-times' style={{ position: 'absolute', top: 16, right: 24, fontSize: 32, color: 'white' }} onClick={handleDiscardRemotePictogramsClick} />
          <label style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', alignSelf: 'center', marginTop: 16 }}>{senderName} dice</label>
          <Stripe stripe={remoteStripe} />
        </div>
      )}
      <Pictograms show={pictogramsVisible} onClose={handleClosePictograms} idStudent={1} idProfessional={1} mode={pictogramModes.STUDENT} />
    </>
  );
};

export default StudentSession;
