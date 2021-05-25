import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBMask, MDBView } from 'mdbreact';
import { HttpStatusCode } from '../../utils/enums/httpConstants';

const Index = () => {
  const [values, setValues] = useState({ user: '', password: '' });
  const [errors, setErrors] = useState({ message: '', show: false });
  // const [loading, setLoading] = useState(false);
  let history = useHistory();

  function handleChange(event) {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors({ message: '', show: false });
    if (!values.user && !values.password) setErrors({ message: 'Debe ingresar usuario y contraseña', show: true });
    else loginUser();
  }

  async function loginUser() {
    // setLoading(true);
    const params = { user: values.user.toUpperCase(), password: values.password };
    // let { response, status } = await postApi(process.env.REACT_APP_API_LOGIN, params);
    // if (status && status !== HttpStatusCode.Ok) setErrors({ message: response, show: true });
    // else {
    //   const token = parseJwt(response);
    //     const name = titleCase(`${token.firstName} ${token.lastName}`);
    //     sessionStorage.setItem('name', name);
    //     sessionStorage.setItem('user', token.userID);
    //     sessionStorage.setItem('profile', JSON.stringify(token.groups));
    //     sessionStorage.setItem('token-security', response);
    //     history.push(`/home`);
    //   }
    // setLoading(false);
  }

  // function titleCase(str) {
  //   const splitStr = str.toLowerCase().split(' ');
  //   for (let i = 0; i < splitStr.length; i++) {
  //     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  //   }
  //   return splitStr.join(' ');
  // }

  // function parseJwt(token) {
  //   const base64Url = token.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join('')
  //   );
  //   return JSON.parse(jsonPayload);
  // }

  return (
    <div id='contactformpage'>
      <MDBView>
        <MDBMask overlay='black-strong' />
        <form className='login'>
          <div className='logo-container'>{/* <img src={Logo} height='75' alt='' /> */}</div>
          <div block-ui='content' className='panel-primary'>
            <div className='container login-box'>
              <div className='title-header'>ATEL - Asistente terapéutico en línea</div>
              <div className='tittle'>¡Hola! Bienvenido</div>
              <div className='d-block mt-3' style={{ fontSize: '16px !important' }}>
                <MDBInput label='Usuario' id='user' onChange={handleChange} value={values.user} group type='text' validate success='right' style={{ marginBottom: '25px' }} />
                <MDBInput label='Contraseña' id='password' onChange={handleChange} value={values.password} group type='password' validate='container' className='mb-4' />
              </div>
              <div className='text-center mt-3 black-text'>
                <MDBBtn onClick={handleSubmit} rounded style={{ fontSize: '14px', padding: '11px 12px', marginTop: '37px', marginBottom: '35px' }} className={'btn-block rounded shadow-none red darken-2 text-white'}>
                  Iniciar Sesión
                  <div className='position-absolute' style={{ right: 13, top: 17 }}></div>
                </MDBBtn>
              </div>
              {errors.show && (
                <div className='w-100 animated fadeInUp faster shadow' style={{ left: 0, bottom: -40, marginTop: '35px' }}>
                  <span className='d-block small text-white text-center py-3 mx-auto rounded w-100' style={{ backgroundColor: '#2e3e4c' }}>
                    {errors.message}
                  </span>
                </div>
              )}
            </div>
          </div>
        </form>
      </MDBView>
    </div>
  );
};

export default Index;
