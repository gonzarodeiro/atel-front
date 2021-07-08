import React, { useEffect, useState } from 'react';
import Layout from '../../../utils/layout/index';
import { useHistory } from 'react-router-dom';
import Begin from './meeting/Begin';
import End from './meeting/End';
import Numerical from './tools/Numerical';
import Alphabetical from './tools/Alphabetical';
import Pictogram from './tools/Pictogram';
import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:3005';

const ProfessionalSession = (props) => {
  const [meeting, showMeeting] = useState({ begin: true, end: false });
  const [tools, showTools] = useState({ alphabetical: false, numerical: false, pictogram: false });
  const [session, setSession] = useState({ generalComments: '', numericalComments: '', alphabeticalComments: '', pictogramComments: '' });
  const [modal, showModal] = useState({ notification: false });
  let history = useHistory();

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.io.on('error', (error) => {
      console.log(error.message);
    });

    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else if (!props.location.state) history.push(`/home`);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  return (
    <Layout>
      <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid #cecbcb' }}>
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
              {meeting.begin && <Begin props={props} handleChange={handleChange} modal={modal} session={session} showModal={showModal} showTools={showTools} showMeeting={showMeeting} />}
              {tools.alphabetical && <Alphabetical props={props} handleChange={handleChange} session={session} showTools={showTools} showMeeting={showMeeting} />}
              {tools.numerical && <Numerical props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} />}
              {tools.pictogram && <Pictogram props={props} handleChange={handleChange} modal={modal} session={session} showTools={showTools} showMeeting={showMeeting} />}
              {meeting.end && <End handleChange={handleChange} session={session} />}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalSession;
