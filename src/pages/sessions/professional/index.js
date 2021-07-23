import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../../utils/layout/index';
import { useHistory } from 'react-router-dom';
import Begin from './meeting/Begin';
import End from './meeting/End';
import Numerical from './tools/Numerical';
import Alphabetical from './tools/Alphabetical';
import Pictogram from './tools/Pictogram';
import { clientEvents, connect, registerEvent } from '../../../utils/socketManager';
import ActivityWizard from '../../../components/ActivityWizard';

const wizardTitle = 'Esperando al alumno';
const wizardMessage = 'Por favor, espera a que el alumno inicie la actividad!\nPresiona continuar para iniciar de todas formas.';
const wizardButtonText = 'CONTINUAR';

const ProfessionalSession = (props) => {
  const [meeting, showMeeting] = useState({ begin: true, end: false });
  const [tools, showTools] = useState({ alphabetical: false, numerical: false, pictogram: false });
  const [session, setSession] = useState({ generalComments: '', numericalComments: '', alphabeticalComments: '', pictogramComments: '', evaluation: '', attention: '' });
  const [modal, showModal] = useState({ notification: false });
  const [wizardVisible, showWizard] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else if (!props.location.state) history.push(`/home`);
    else connect(props.location.state.roomId + '-' + props.location.state.sessionId);

    registerEvent(() => {
      showWizard(false);
    }, clientEvents.initAlphabetical);
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

  const handleCloseWizardClick = useCallback(() => showWizard(false), []);

  return (
    <Layout>
      <div className='card shadow-sm container px-0' style={{ border: '1px solid #cecbcb' }}>
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
              {meeting.begin && <Begin props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} copyClipboard={copyClipboard} />}
              {tools.alphabetical && <Alphabetical props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} copyClipboard={copyClipboard} showModal={showModal} showWizard={showWizard} />}
              {tools.numerical && <Numerical props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} />}
              {tools.pictogram && <Pictogram props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} />}
              {meeting.end && <End handleChange={handleChange} session={session} />}
            </form>
          </div>
        </div>
      </div>
      {wizardVisible && <ActivityWizard title={wizardTitle} message={wizardMessage} onCloseClick={handleCloseWizardClick} closeButtonText={wizardButtonText} />}
    </Layout>
  );
};

export default ProfessionalSession;
