import React, { useState } from 'react';
import { MDBMask, MDBView } from 'mdbreact';
import './../../styles/css/login.css';
import Loading from '../../components/Loading';
import Login from './steps/Login';
import Registration from './steps/Registration';
import postApi from '../../utils/services/post/postApi';
import Logo from '../../styles/images/logo.png';

const Index = () => {
  const [user, setUser] = useState({ user: '', password: '' });
  const [registration, setRegistration] = useState({ firstName: '', lastName: '', username: '', email: '', password: '', profession: '' });
  const [steps, setSteps] = useState({ login: true, registration: false });
  const [errorsLogin, setErrorsLogin] = useState({ message: '', show: false });
  const [errorsRegistration, setErrorsRegistration] = useState({ message: '', show: false });
  const [isLoading, setLoading] = useState(false);

  function handleChangeLogin(event) {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  }

  function handleChangeRegistration(event) {
    const { id, value } = event.target;
    setRegistration({ ...registration, [id]: value });
  }

  return (
    <div id='contactformpage'>
      <MDBView>
        <MDBMask overlay='black-strong' />
        <form className='login'>
          <div block-ui='content' className='panel-primary'>
            <div className='container login-box'>
              {isLoading && (
                <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
                  <Loading />
                </div>
              )}
              <div className='row justify-content-md-center' style={{ marginBottom: '43px', marginTop: '-5px' }}>
                <img src={Logo} alt='' width='300' />
              </div>
              {steps.login && <Login handleChange={handleChangeLogin} user={user} setSteps={setSteps} errorsLogin={errorsLogin} setErrorsLogin={setErrorsLogin} setLoading={setLoading} />}
              {steps.registration && <Registration handleChange={handleChangeRegistration} registration={registration} setSteps={setSteps} errorsRegistration={errorsRegistration} setErrorsRegistration={setErrorsRegistration} setRegistration={setRegistration} />}
            </div>
          </div>
        </form>
      </MDBView>
    </div>
  );
};

export default Index;
