import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../../../utils/layout/index';
import { useHistory } from 'react-router-dom';
import Begin from './meeting/Begin';
import End from './meeting/End';
import Numerical from './tools/Numerical';
import Alphabetical from './tools/Alphabetical';
import Pictograms, { modalResults } from '../../../../components/Activity/Pictograms';
import { clientEvents, connect, registerEvent, sendMessage } from '../../../../utils/socketManager';
import ActivityWizard from '../../../../components/ActivityWizard';
import wizardVideo from '../../../../components/Activity/Alphabetical/video/wizard_480_1MB.mp4';
import Celebration, { celebrationType } from '../../../../components/Celebration';
import Loading from '../../../../components/Loading';
import FloatingJitsi from '../../../../components/FloatingJitsi';
import Stripe from '../../../../components/Activity/Pictograms/components/Stripe';
import { Row } from 'react-bootstrap';
import { MDBBtn } from 'mdbreact';

const wizardTitle = 'Esperando al alumno';
const wizardMessage = 'Por favor, espera a que el alumno inicie la actividad!\nPresiona continuar para iniciar de todas formas.';
const wizardButtonText = 'CONTINUAR';

const ProfessionalSession = (props) => {
  const [meeting, showMeeting] = useState({ begin: true, end: false });
  const [tools, showTools] = useState({ alphabetical: false, numerical: false, pictogram: false });
  const [session, setSession] = useState({ generalComments: '', numericalComments: '', alphabeticalComments: '', pictogramComments: '', evaluation: '', attention: '' });
  const [modal, showModal] = useState({ notification: false });
  const [wizardVisible, showWizard] = useState(false);
  const [loading, setShowLoading] = useState(true);
  const [celebrationVisible, setCelebrationVisible] = useState(true);
  const [showJitsi, setShowJitsi] = useState(true);
  const [pictogramsVisible, showPictograms] = useState(false);
  const [stripe, setStripe] = useState([]);
  const [stripeVisible, setStripeVisible] = useState(false);
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
      setStripe(stripe);
    }
    showPictograms(false);
    showPictogramStripeToStudent(false);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  }

  function handleShowPictogramsToStudentClick() {
    showPictogramStripeToStudent(!stripeVisible);
  }

  function handleDiscardPictogramsClick() {
    showPictogramStripeToStudent(false);
    setStripe([]);
  }

  function showPictogramStripeToStudent(visible) {
    // cambio la visibilidad del los pictogramas al terapeuta
    setStripeVisible(visible);
    // envio la tira seleccionada al alumno y si la debo mostrar o no.
    sendMessage(clientEvents.showPictogramStripe, { stripe, visible });
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
              {meeting.end && <End handleChange={handleChange} session={session} props={props} />}
            </form>
          </div>
        </div>
      </div>
      <div id='index-jitsi'>{props.location.state && showJitsi && <FloatingJitsi roomId={props.location.state.roomId + '-' + props.location.state.sessionId} name={sessionStorage.getItem('name')} />}</div>
      {stripe && stripe.length && (
        <div className='card shadow-sm container px-0 mb-4 pt-4' style={{ border: '1px solid #cecbcb' }}>
          <Row style={{ justifyContent: 'center' }}>
            <MDBBtn onClick={handleShowPictogramsToStudentClick} className={`${stripeVisible ? 'red' : 'blue'} darken-2 shadow-none btnOption mr-2 mt-2 ml-0`} style={{ marginBottom: '10px !important', marginRight: '5px !important', backgroundColor: '#dd4b39 !important', color: '#FFF', borderColor: '#dd4b39' }}>
              <i className={`fas ${stripeVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              <span className='ml-2'>{stripeVisible ? 'Dejar de mostrar al alumno' : 'Mostrar al alumno'}</span>
            </MDBBtn>
            <MDBBtn onClick={handleDiscardPictogramsClick} className='bg-light shadow-none btnOption mr-2 mt-2 ml-0' style={{ marginBottom: '10px !important', marginRight: '5px !important', backgroundColor: '#dd4b39 !important', color: '#FFF', borderColor: '#dd4b39' }}>
              <i className='fas fa-times-circle'></i>
              <span className='ml-2'>Descartar pictogramas</span>
            </MDBBtn>
          </Row>
          <Stripe stripe={stripe} />
        </div>
      )}
      {celebrationVisible && <Celebration type={celebrationType.SENDER} />}
      {wizardVisible && <ActivityWizard src={wizardVideo} title={wizardTitle} message={wizardMessage} onCloseClick={handleCloseWizardClick} closeButtonText={wizardButtonText} />}
      <Pictograms show={pictogramsVisible} onClose={handleClosePictograms} idStudent={1} idProfessional={1} />
    </Layout>
  );
};

export default ProfessionalSession;
