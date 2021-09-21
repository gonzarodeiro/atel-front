import React, { useEffect, useState } from 'react';
import Layout from '../../../../utils/layout/index';
import { useHistory } from 'react-router-dom';
import Begin from './meeting/Begin';
import End from './meeting/End';
import { connect } from '../../../../utils/socketManager';
import Loading from '../../../../components/Loading';
import StudentView from '../../../../components/StudentView';

const ZoomProfessionalSession = (props) => {
  const [meeting, showMeeting] = useState({ begin: true, end: false });
  const [session, setSession] = useState({ generalComments: '', evaluation: '', attention: '' });
  const [modal, showModal] = useState({ notification: false });
  const [loading, setShowLoading] = useState(true);
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
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  function copyClipboard() {
    const roomZoomSplit = props.location.state.roomZoom.split('-');
    const sharedLink = window.location.href.replace('zoom-session', 'student-zoom-session/' + roomZoomSplit[0] + '-' + roomZoomSplit[1] + '-' + props.location.state.userName + '-' + props.location.state.sessionId);
    navigator.clipboard.writeText(sharedLink);
    showModal({ notification: true });
  }

  return (
    <Layout>
      <div className='card shadow-sm container px-0 mb-3' style={{ border: '1px solid #cecbcb' }}>
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
              {meeting.begin && <Begin props={props} handleChange={handleChange} modal={modal} session={session} showMeeting={showMeeting} copyClipboard={copyClipboard} />}
              {meeting.end && <End handleChange={handleChange} session={session} props={props} />}
            </form>
          </div>
        </div>
        <StudentView />
      </div>
    </Layout>
  );
};

export default ZoomProfessionalSession;
