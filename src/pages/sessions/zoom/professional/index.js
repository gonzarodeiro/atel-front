import React, { useEffect, useState } from 'react';
import Layout from '../../../../utils/layout/index';
import { useHistory } from 'react-router-dom';
import Begin from './meeting/Begin';
import End from './meeting/End';
import { connect } from '../../../../utils/socketManager';

const ZoomProfessionalSession = (props) => {
  const [meeting, showMeeting] = useState({ begin: true, end: false });
  const [session, setSession] = useState({ generalComments: '', evaluation: '', attention: '' });
  const [modal, showModal] = useState({ notification: false });
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else if (!props.location.state) history.push(`/home`);
    else connect(props.location.state.roomId + '-' + props.location.state.sessionId);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  function copyClipboard() {
    const sharedLink = window.location.href.replace('zoom-session', 'student-zoom-session/' + props.location.state.userName + '-' + props.location.state.sessionId);
    navigator.clipboard.writeText(sharedLink);
    showModal({ notification: true });
  }

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
              {meeting.begin && <Begin props={props} handleChange={handleChange} modal={modal} session={session} showMeeting={showMeeting} copyClipboard={copyClipboard} />}
              {meeting.end && <End handleChange={handleChange} session={session} props={props} />}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZoomProfessionalSession;
