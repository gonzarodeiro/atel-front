import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MDBMask, MDBView } from 'mdbreact';
import './../../styles/css/login.css';
import Loading from '../../components/Loading';
import Login from './steps/Login';
import Registration from './steps/Registration';
import postApi from '../../utils/services/post/postApi';
import showAlert from '../../utils/commons/showAlert';

const Index = () => {
  const [user, setUser] = useState({ name: '', password: '' });
  const [registration, setRegistration] = useState({ name: '', user: '', email: '', password: '', profession: '' });
  const [steps, setSteps] = useState({ login: true, registration: false });
  const [errorsLogin, setErrorsLogin] = useState({ message: '', show: false });
  const [errorsRegistration, setErrorsRegistration] = useState({ message: '', show: false });
  const [isLoading, setLoading] = useState(false);
  let history = useHistory();

  function handleChangeLogin(event) {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  }

  function handleChangeRegistration(event) {
    const { id, value } = event.target;
    setRegistration({ ...registration, [id]: value });
  }

  function handleLogin(event) {
    event.preventDefault();
    setErrorsLogin({ message: '', show: false });
    if (!user.name && !user.password) {
      setErrorsLogin({ message: 'Debe ingresar usuario y contraseña', show: true });
      setTimeout(() => {
        setErrorsLogin({ message: '', show: false });
      }, 3000);
    } else checkUser();
  }

  async function checkUser() {
    setLoading(true);
    // const params = { user: values.user.toUpperCase(), password: values.password };
    // await postApi("login", params);

    const name = 'Gonzalo Rodeiro';
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('idProfessional', 1);
    setLoading(false);
    history.push(`/home`);
  }

  async function handleRegistration() {
    setLoading(true);
    if (validateFields()) {
      setLoading(false);
      await showAlert('Profesional registrado', 'Ha sido registrado con éxito en el sistema', 'success');
      setSteps({ login: true, registration: false });
      setRegistration({ name: '', user: '', email: '', password: '', profession: '' });
    }
    setLoading(false);
  }

  function validateFields() {
    if (!registration.name || !registration.user || !registration.email || !registration.password || !registration.profession) {
      setErrorsRegistration({ show: true, message: 'Complete los campos obligatorios' });
      setTimeout(() => {
        setErrorsRegistration({ message: '', show: false });
      }, 3000);
      return;
    }

    const validEmail = /\S+@\S+\.\S+/;
    if (!validEmail.test(registration.email)) {
      setErrorsRegistration({ show: true, message: 'Ingrese un email válido' });
      setTimeout(() => {
        setErrorsRegistration({ message: '', show: false });
      }, 3000);
      return;
    }

    return true;
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
              <div className='title-header'>ATEL - Asistente terapéutico en línea</div>
              {steps.login && <Login handleChange={handleChangeLogin} user={user} handleLogin={handleLogin} setSteps={setSteps} errorsLogin={errorsLogin} setErrorsLogin={setErrorsLogin} />}
              {steps.registration && <Registration handleChange={handleChangeRegistration} registration={registration} handleRegistration={handleRegistration} setSteps={setSteps} errorsRegistration={errorsRegistration} setErrorsRegistration={setErrorsRegistration} />}
            </div>
          </div>
        </form>
      </MDBView>
    </div>
  );
};

export default Index;
