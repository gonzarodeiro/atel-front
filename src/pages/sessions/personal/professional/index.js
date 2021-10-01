import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../../../utils/layout/index';
import { useHistory } from 'react-router-dom';
import Begin from './meeting/Begin';
import End from './meeting/End';
import Numerical from './tools/Numerical';
import Alphabetical from './tools/Alphabetical';
import Boxes from './tools/Boxes';
import Pictograms, { modalResults, pictogramModes } from '../../../../components/Activity/Pictograms';
import { clientEvents, connect, registerEvent, sendMessage } from '../../../../utils/socketManager';
import ActivityWizard from '../../../../components/ActivityWizard';
import wizardVideo from '../../../../components/Activity/Alphabetical/video/wizard_480_1MB.mp4';
import Celebration, { celebrationType } from '../../../../components/Celebration';
import Loading from '../../../../components/Loading';
import FloatingJitsi from '../../../../components/FloatingJitsi';
import Stripe from '../../../../components/Activity/Pictograms/components/Stripe';
import { Row } from 'react-bootstrap';
import { MDBBtn } from 'mdbreact';
import PictoFab from '../../../../components/Activity/Pictograms/components/PictoFab';

const wizardTitle = 'Esperando al alumno';
const wizardMessage = 'Por favor, espera a que el alumno inicie la actividad!\nPresiona continuar para iniciar de todas formas.';
const wizardButtonText = 'CONTINUAR';

const ProfessionalSession = (props) => {
  const [meeting, showMeeting] = useState({ begin: true, end: false });
  const [tools, showTools] = useState({ alphabetical: false, numerical: false, pictogram: false, boxes: false });
  const [session, setSession] = useState({ generalComments: '', numericalComments: '', alphabeticalComments: '', evaluation: '', attention: '' });
  const [modal, showModal] = useState({ notification: false });
  const [wizardVisible, showWizard] = useState(false);
  const [loading, setShowLoading] = useState(true);
  const [celebrationVisible, setCelebrationVisible] = useState(true);
  const [showJitsi, setShowJitsi] = useState(true);
  const [pictogramsVisible, showPictograms] = useState(false);
  const [localStripe, setLocalStripe] = useState([]);
  const [remoteStripe, setRemoteStripe] = useState([]);
  const [remoteStripeVisible, setRemoteStripeVisible] = useState(false);
  const [isLocalStripeInForeground, setIsLocalStripeInForeground] = useState(false);
  const [senderName, setSenderName] = useState('');
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else if (!props.location.state) history.push(`/home`);
    else {
      setTimeout(() => {
        setShowLoading(false);
      }, 3000);
      connect(props.location.state.roomId + '-' + props.location.state.sessionId);
    }

    registerEvent(() => {
      showWizard(false);
    }, clientEvents.closeActivityWizard);

    registerEvent(({ stripe, visible, sender }) => {
      console.log('showPictogramStripe', stripe, visible);
      setRemoteStripe(stripe);
      setRemoteStripeVisible(visible);
      setIsLocalStripeInForeground(false);
      setSenderName(sender);
    }, clientEvents.showPictogramStripe);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  function copyClipboard() {
    const sharedLink = window.location.href.replace('professionalSession', 'studentSession/' + props.location.state.userName + '-' + props.location.state.sessionId);
    navigator.clipboard.writeText(sharedLink);
    showModal({ notification: true });
  }

  const handleCloseWizardClick = useCallback(() => {
    sendMessage(clientEvents.closeActivityWizard);
    showWizard(false);
  }, []);

  function handleJitsiLayout(layout) {
    if (!layout) {
      setShowJitsi(false);
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

  function handleClosePictograms(mr, stripe) {
    if (mr === modalResults.OK) {
      if (isLocalStripeInForeground) {
        showPictogramStripeInForeground(false);
      }
      setLocalStripe(stripe);
      scrollToBottom();
    }
    showPictograms(false);
  }

  function scrollToBottom() {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  }

  function handleShowPictogramsInForegroundClick() {
    showPictogramStripeInForeground(!isLocalStripeInForeground);
  }

  function handleDiscardPictogramsClick() {
    if (isLocalStripeInForeground) {
      showPictogramStripeInForeground(false);
    }
    setLocalStripe([]);
  }

  function handleDiscardRemotePictogramsClick() {
    if (isLocalStripeInForeground) {
      showPictogramStripeInForeground(false);
    } else {
      setRemoteStripeVisible(false);
    }
  }

  function showPictogramStripeInForeground(visible) {
    const sender = sessionStorage.getItem('name');
    setSenderName(sender);
    setRemoteStripe(localStripe);
    setRemoteStripeVisible(visible);
    setIsLocalStripeInForeground(visible);
    sendMessage(clientEvents.showPictogramStripe, { stripe: localStripe, visible, sender });
  }
  return (
    <Layout>
      <div className='card shadow-sm container px-0 mb-4' style={{ border: '1px solid #cecbcb' }}>
        {loading && (
          <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
            <Loading />
          </div>
        )}
        <div className='container'>
          <div className='card-body'>
            <div className='card-title pb-1 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {props.location.state && (
                <label>
                  Sesión con {props.location.state.userName} - {props.location.state.date}
                </label>
              )}
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              {meeting.begin && <Begin props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} copyClipboard={copyClipboard} setCelebrationVisible={setCelebrationVisible} showPictograms={showPictograms} onJitsiLayout={handleJitsiLayout} />}
              {tools.alphabetical && <Alphabetical props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} copyClipboard={copyClipboard} showModal={showModal} showWizard={showWizard} setCelebrationVisible={setCelebrationVisible} showPictograms={showPictograms} onJitsiLayout={handleJitsiLayout} />}
              {tools.numerical && <Numerical props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} setCelebrationVisible={setCelebrationVisible} showPictograms={showPictograms} onJitsiLayout={handleJitsiLayout} />}
              {tools.boxes && <Boxes props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} setCelebrationVisible={setCelebrationVisible} showPictograms={showPictograms} onJitsiLayout={handleJitsiLayout} />}
              {meeting.end && <End handleChange={handleChange} session={session} props={props} />}
            </form>
          </div>
        </div>
      </div>
      <div id='index-jitsi'>{props.location.state && showJitsi && <FloatingJitsi roomId={props.location.state.roomId + '-' + props.location.state.sessionId} name={sessionStorage.getItem('name')} />}</div>
      {localStripe && localStripe.length > 0 && (
        <div className='card shadow-sm container px-0 mb-4 pt-4' style={{ border: '1px solid #cecbcb' }}>
          <Row style={{ justifyContent: 'center' }}>
            <MDBBtn onClick={handleDiscardPictogramsClick} className='bg-light shadow-none btnOption mr-2 mt-2 ml-0' style={{ marginBottom: '10px !important', marginRight: '5px !important' }}>
              <i className='fas fa-times-circle'></i>
              <span className='ml-2'>Descartar</span>
            </MDBBtn>
            <MDBBtn onClick={handleShowPictogramsInForegroundClick} className={`${isLocalStripeInForeground ? 'red' : 'blue'} darken-2 shadow-none btnOption mr-2 mt-2 ml-0`} style={{ marginBottom: '10px !important', marginRight: '5px !important', backgroundColor: '#dd4b39 !important', color: '#FFF', borderColor: '#dd4b39' }}>
              <i className={`fas ${isLocalStripeInForeground ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              <span className='ml-2'>{isLocalStripeInForeground ? 'Quitar de primer plano' : 'Poner en primer plano'}</span>
            </MDBBtn>
          </Row>
          <Stripe stripe={localStripe} />
        </div>
      )}
      <PictoFab style={{ bottom: 96 }} onClick={() => showPictograms(true)} />
      {celebrationVisible && <Celebration type={celebrationType.SENDER} />}
      {wizardVisible && <ActivityWizard src={wizardVideo} title={wizardTitle} message={wizardMessage} onCloseClick={handleCloseWizardClick} closeButtonText={wizardButtonText} />}
      {remoteStripeVisible && (
        <div className='fade-in' style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(0,0,0, 0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <i className='fas fa-times' style={{ position: 'absolute', top: 16, right: 24, fontSize: 32, color: 'white' }} onClick={handleDiscardRemotePictogramsClick} />
          <label style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', alignSelf: 'center', marginTop: 16 }}>{senderName} dice</label>
          <Stripe stripe={remoteStripe} />
        </div>
      )}
      <Pictograms show={pictogramsVisible} onClose={handleClosePictograms} idStudent={1} idProfessional={1} mode={pictogramModes.PROFESSIONAL} />
    </Layout>
  );
};

export default ProfessionalSession;
